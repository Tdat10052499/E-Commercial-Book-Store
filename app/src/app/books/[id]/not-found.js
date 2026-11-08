import Link from 'next/link';

// US-11/AC-03: unknown, hidden or non-numeric book id → friendly page, HTTP 404, no technical details.
export default function BookNotAvailable() {
  return (
    <section className="empty-state">
      <h1>Sorry, this book is not available</h1>
      <p className="muted">It may have been removed, or the link is not correct.</p>
      <p><Link className="btn" href="/books">Browse the catalogue</Link></p>
    </section>
  );
}
