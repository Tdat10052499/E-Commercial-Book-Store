import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBook } from '@lib/catalog';
import BookDetail from '@/components/BookDetail';
import { backToListHref } from '@lib/catalog-validation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await getBook(id);
  return { title: book ? `${book.title} – Page Turners` : 'Book not available – Page Turners' };
}

// US-11 Book detail. A missing, hidden or non-numeric id shows the friendly 404 page (AC-03).
// "Back to list" returns to the same page, search and filter (AC-02), or to page 1 when opened directly (AC-04).
export default async function BookDetailPage({ params, searchParams }) {
  const { id } = await params;
  const { from } = await searchParams;
  const book = await getBook(id);
  if (!book) notFound();
  return (
    <section className="book-detail-page">
      <p className="back-link"><Link href={backToListHref(from)}>← Back to list</Link></p>
      <BookDetail book={book} />
    </section>
  );
}
