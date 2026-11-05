import Link from 'next/link';
import { requireCatalogEditor } from '@/lib/current-user';
import { listAdminBooks } from '@lib/catalog';
import { formatPrice } from '@lib/catalog-validation';
import HideButton from './HideButton';

export const metadata = { title: 'Books – Back office' };

// US-05/06/07 and US-24: Admin and Store Staff add and edit books; only Admin sees Delete (US-24/AC-02).
export default async function AdminBooksPage() {
  const user = await requireCatalogEditor('/admin/books');
  const canHide = user.role === 'admin';
  const books = await listAdminBooks();
  return (
    <section>
      <div className="section-head">
        <h1>Books</h1>
        <Link href="/admin/books/new" className="btn">Add book</Link>
      </div>
      <p className="muted">{books.length} visible {books.length === 1 ? 'book' : 'books'}, newest first.{canHide ? ' Delete hides a book from the shop and keeps its record.' : ''}</p>
      <div className="card table-wrap">
        {books.length === 0 ? <p className="muted">No books yet.</p> : (
          <table className="table-stack">
            <thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Price</th><th>Stock</th><th>Action</th></tr></thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id}>
                  <td data-label="Title">{b.title}</td>
                  <td data-label="Author">{b.author_name || '–'}</td>
                  <td data-label="Category">{b.category_name || '–'}</td>
                  <td data-label="Price">{formatPrice(b.price)}</td>
                  <td data-label="Stock">{b.stock}</td>
                  <td data-label="Action" className="row-actions">
                    <Link href={`/admin/books/${b.id}/edit`} className="btn-ghost small">Edit</Link>
                    {canHide && <HideButton id={b.id} title={b.title} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
