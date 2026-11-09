import { notFound } from 'next/navigation';
import { getBook } from '@lib/catalog';
import BookDetail from '@/components/BookDetail';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await getBook(id);
  return { title: book ? `${book.title} – Page Turners` : 'Book not available – Page Turners' };
}

// US-11 Book detail. A missing, hidden or non-numeric id shows the friendly 404 page (AC-03).
export default async function BookDetailPage({ params }) {
  const { id } = await params;
  const book = await getBook(id);
  if (!book) notFound();
  return (
    <section className="book-detail-page">
      <BookDetail book={book} />
    </section>
  );
}
