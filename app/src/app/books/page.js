import BookCard from '@/components/BookCard';
import Pagination from '@/components/Pagination';
import { listBooksPage } from '@lib/catalog';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Books – Page Turners' };

// US-10: visible books, newest first, 12 per page. Invalid page numbers fall back to page 1 or the last page (AC-03).
export default async function BooksPage({ searchParams }) {
  const { page: raw } = await searchParams;
  const { books, page, lastPage, total } = await listBooksPage(raw);
  return (
    <section className="catalogue">
      <div className="section-head">
        <h1>All books</h1>
        {total > 0 && <span className="muted">{total} {total === 1 ? 'title' : 'titles'} · page {page} of {lastPage}</span>}
      </div>
      {books.length === 0
        ? <p className="empty">No books available yet</p>
        : <div className="book-grid">{books.map((b) => <BookCard key={b.id} book={b} />)}</div>}
      <Pagination page={page} lastPage={lastPage} />
    </section>
  );
}
