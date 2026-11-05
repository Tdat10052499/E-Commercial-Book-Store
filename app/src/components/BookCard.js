import { formatPrice } from '@lib/catalog-validation';

// US-10/AC-01: one card = cover, title, author, price. Books without a cover get a typographic one.
export function coverSrc(book) {
  if (book.has_upload) return `/book-covers/${book.id}`;
  return book.cover_url || null;
}

export default function BookCard({ book }) {
  const src = coverSrc(book);
  return (
    <article className="book-card">
      <div className="book-cover">
        {src
          ? <img src={src} alt={`Cover of ${book.title}`} loading="lazy" width={200} height={300} />
          : <div className="cover" aria-hidden="true"><span className="cover-title">{book.title}</span><span className="cover-author">{book.author_name}</span></div>}
      </div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author muted">{book.author_name || 'Unknown author'}</p>
      <p className="book-price">{formatPrice(book.price)}</p>
    </article>
  );
}
