'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin, requireCatalogEditor } from '@/lib/current-user';
import { createBook, updateBook, hideBook } from '@lib/catalog';

const FIELDS = ['title', 'author_id', 'category_id', 'price', 'description', 'stock'];
const read = (formData) => Object.fromEntries(FIELDS.map((k) => [k, formData.get(k) ?? '']));

// Uploaded file → { data, type } for the server-side checks in lib/catalog.js (size, type, real signature).
async function readCover(formData) {
  const file = formData.get('cover');
  if (!file || typeof file === 'string' || !file.size) return null;
  return { data: Buffer.from(await file.arrayBuffer()), type: file.type };
}

function refresh() {
  revalidatePath('/admin/books');
  revalidatePath('/books');
  revalidatePath('/');
}

// US-05 (Admin) and US-24/AC-01 (Store Staff): add a book. Role re-checked on the server.
export async function createBookAction(_prev, formData) {
  const user = await requireCatalogEditor('/admin/books/new');
  const values = read(formData);
  const { book, errors } = await createBook(values, await readCover(formData), user);
  if (errors) return { errors, values };
  refresh();
  return { message: `Book “${book.title}” added`, key: Date.now() };
}

// US-06 (Admin, Store Staff): edit a book; invalid data keeps the old values (AC-02).
export async function updateBookAction(_prev, formData) {
  const id = formData.get('id');
  const user = await requireCatalogEditor(`/admin/books/${id}/edit`);
  const values = read(formData);
  const result = await updateBook(id, values, await readCover(formData), user); // US-25: name stored with the change
  if (result.errors) return { errors: result.errors, values };
  if (result.unchanged) return { message: 'No changes – the book is unchanged', values };
  refresh();
  revalidatePath(`/admin/books/${id}/edit`);
  return { message: 'Changes saved', values };
}

// US-07 (soft delete) is Admin-only: Store Staff gets 403 even on a direct request (US-24/AC-02).
export async function hideBookAction(formData) {
  await requireAdmin('/admin/books');
  const result = await hideBook(formData.get('id'));
  if (result.ok) refresh();
  return result;
}
