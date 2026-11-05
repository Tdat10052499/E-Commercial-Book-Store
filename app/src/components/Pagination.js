import Link from 'next/link';

// US-10/AC-01, AC-02: Previous / page numbers / Next; no Next link on the last page.
export default function Pagination({ page, lastPage, basePath = '/books' }) {
  if (lastPage <= 1) return null;
  const href = (p) => (p === 1 ? basePath : `${basePath}?page=${p}`);
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  return (
    <nav className="pagination" aria-label="Pages">
      {page > 1 ? <Link href={href(page - 1)} rel="prev">Previous</Link> : <span className="disabled">Previous</span>}
      {pages.map((p) => (p === page
        ? <span key={p} className="current" aria-current="page">{p}</span>
        : <Link key={p} href={href(p)}>{p}</Link>))}
      {page < lastPage ? <Link href={href(page + 1)} rel="next">Next</Link> : <span className="disabled">Next</span>}
    </nav>
  );
}
