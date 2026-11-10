import Link from 'next/link';
import { formatPrice, detailHref } from '@lib/catalog-validation';
import CoverImage from '@/components/CoverImage';

// US-10/AC-01: one card = cover, title, author, price. Books without a cover get a typographic one.
// US-11/AC-01: the whole card opens the book's detail page; AC-02: it carries the list state for "Back to list".
export function coverSrc(book) {
  if (book.has_upload) return `/book-covers/${book.id}`;
  return book.cover_url || null;
}

export default function BookCard({ book, listQuery = '' }) {
  const src = coverSrc(book);
  return (
    <article className="book-card">
      <Link className="book-card-link" href={detailHref(book.id, listQuery)}>
        <div className="book-cover">
          <CoverImage src={src} title={book.title} author={book.author_name} width={200} height={300} />
        </div>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author muted">{book.author_name || 'Unknown author'}</p>
        <p className="book-price">{formatPrice(book.price)}</p>
      </Link>
    </article>
  );
}
