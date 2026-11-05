import Link from 'next/link';

// US-06/AC-03: friendly message for an unknown or hidden book id.
export default function BookNotFound() {
  return (
    <section>
      <h1>Book not found</h1>
      <p className="muted">The book does not exist or has been deleted.</p>
      <p><Link href="/admin/books">Back to books</Link></p>
    </section>
  );
}
