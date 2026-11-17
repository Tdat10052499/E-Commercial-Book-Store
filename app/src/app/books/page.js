import Link from 'next/link';
import BookCard from '@/components/BookCard';
import FilterBar from '@/components/FilterBar';
import Pagination from '@/components/Pagination';
import { listBooksPage, listCatalogOptions } from '@lib/catalog';
import { listQueryString, hasActiveFilters } from '@lib/catalog-validation';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Books – Page Turners' };

// US-10: visible books, newest first, 12 per page. Invalid page numbers fall back to page 1 or the last page (AC-03).
// US-12 / US-13: search and filter from the URL (?q=&category=&min=&max=&page=), validated on the server.
export default async function BooksPage({ searchParams }) {
  const params = await searchParams;
  const [{ books, page, lastPage, total, filters = {}, error = null }, { categories }] = await Promise.all([
    listBooksPage(params.page, params),
    listCatalogOptions(),
  ]);
  const active = hasActiveFilters(params);
  const listQuery = listQueryString({ ...params, page }); // US-11/AC-02: the page actually shown + search/filter

  return (
    <section className="catalogue">
      <div className="section-head">
        <h1>All books</h1>
        {total > 0 && (
          <span className="muted">
            {total} {total === 1 ? (active ? 'result' : 'title') : (active ? 'results' : 'titles')} · page {page} of {lastPage}
          </span>
        )}
      </div>
      <FilterBar params={params} filters={filters} categories={categories} error={error} active={active} />
      {books.length === 0
        ? (active
          ? (
            <div className="empty">
              <p>No books match your search</p>
              <p><Link className="btn-ghost" href="/books">Clear filters</Link></p>
            </div>
          )
          : <p className="empty">No books available yet</p>)
        : <div className="book-grid">{books.map((b) => <BookCard key={b.id} book={b} listQuery={listQuery} />)}</div>}
      <Pagination page={page} lastPage={lastPage} params={params} />
    </section>
  );
}
