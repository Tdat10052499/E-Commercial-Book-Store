import BookCard from '@/components/BookCard';
import Pagination from '@/components/Pagination';
import { listBooksPage } from '@lib/catalog';
import { listQueryString } from '@lib/catalog-validation';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Books – Page Turners' };

// US-10: visible books, newest first, 12 per page. Invalid page numbers fall back to page 1 or the last page (AC-03).
export default async function BooksPage({ searchParams }) {
  const params = await searchParams;
  const { books, page, lastPage, total } = await listBooksPage(params.page);
  const listQuery = listQueryString({ ...params, page }); // US-11/AC-02: the page actually shown + search/filter

  return (
    <section className="catalogue">
      <div className="section-head">
        <h1>All books</h1>
        {total > 0 && <span className="muted">{total} {total === 1 ? 'title' : 'titles'} · page {page} of {lastPage}</span>}
      </div>
      {books.length === 0
        ? <p className="empty">No books available yet</p>
        : <div className="book-grid">{books.map((b) => <BookCard key={b.id} book={b} listQuery={listQuery} />)}</div>}
      <Pagination page={page} lastPage={lastPage} />
    </section>
  );
}
