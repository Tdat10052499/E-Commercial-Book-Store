'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin, requireCatalogEditor } from '@/lib/current-user';
import { createAuthor, updateAuthor, removeAuthor } from '@lib/catalog';

const PATH = '/admin/authors';
const read = (formData) => ({ name: formData.get('name'), bio: formData.get('bio') });

// Every action re-checks the role on the server (US-04/AC-02), whatever the page showed.
export async function createAuthorAction(_prev, formData) {
  await requireCatalogEditor(PATH);
  const values = read(formData);
  const { author, errors } = await createAuthor(values);
  if (errors) return { errors, values };
  revalidatePath(PATH);
  return { message: `Author “${author.name}” added`, key: Date.now() };
}

export async function updateAuthorAction(_prev, formData) {
  await requireCatalogEditor(PATH);
  const values = read(formData);
  const { author, errors } = await updateAuthor(formData.get('id'), values);
  if (errors) return { errors, values };
  revalidatePath(PATH);
  revalidatePath('/books');
  return { message: `Saved “${author.name}”` };
}

// Remove stays Admin-only: CR-06 team assumption until the Sponsor answers (Staff may add/edit only).
export async function removeAuthorAction(formData) {
  await requireAdmin(PATH);
  const result = await removeAuthor(formData.get('id'));
  if (result.ok) revalidatePath(PATH);
  return result;
}
