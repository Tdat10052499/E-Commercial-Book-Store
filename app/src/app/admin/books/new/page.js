import Link from 'next/link';
import { requireCatalogEditor } from '@/lib/current-user';
import { listCatalogOptions } from '@lib/catalog';
import BookForm from '../BookForm';
import { createBookAction } from '../actions';

export const metadata = { title: 'Add book – Back office' };

// US-05 Add book (Admin) and US-24/AC-01 (Store Staff).
export default async function NewBookPage() {
  await requireCatalogEditor('/admin/books/new');
  const options = await listCatalogOptions();
  return (
    <section>
      <p><Link href="/admin/books">← All books</Link></p>
      <h1>Add book</h1>
      {(!options.authors.length || !options.categories.length) && (
        <p className="error" role="alert">Add at least one <Link href="/admin/authors">author</Link> and one <Link href="/admin/categories">category</Link> first.</p>
      )}
      <BookForm action={createBookAction} options={options} submitLabel="Add book" pendingLabel="Adding…" />
    </section>
  );
}
