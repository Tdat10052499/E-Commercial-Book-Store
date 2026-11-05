import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireCatalogEditor } from '@/lib/current-user';
import { getBook, listCatalogOptions } from '@lib/catalog';
import BookForm from '../../BookForm';
import { updateBookAction } from '../../actions';

export const metadata = { title: 'Edit book – Back office' };

// US-06 Edit book. Unknown or hidden id → "Book not found" (AC-03).
export default async function EditBookPage({ params }) {
  const { id } = await params;
  await requireCatalogEditor(`/admin/books/${id}/edit`);
  const book = await getBook(id);
  if (!book) notFound();
  const options = await listCatalogOptions();
  return (
    <section>
      <p><Link href="/admin/books">← All books</Link></p>
      <h1>Edit book</h1>
      <BookForm action={updateBookAction} options={options} book={book} submitLabel="Save changes" pendingLabel="Saving…" />
    </section>
  );
}
