import { formatPrice } from '@lib/catalog-validation';
import { coverSrc } from '@/components/BookCard';
import CoverImage from '@/components/CoverImage';

export function stockText(stock) {
  const n = Number(stock) || 0;
  return n > 0 ? `${n} in stock` : 'Out of stock (0)';
}

// US-11/AC-01: cover, title, author, category, price, description and stock of one visible book.
export default function BookDetail({ book }) {
  const src = coverSrc(book);
  return (
    <article className="book-detail">
      <div className="book-detail-cover book-cover">
        <CoverImage src={src} title={book.title} author={book.author_name} width={400} height={600} lazy={false} />
      </div>
      <div className="book-detail-info">
        <h1 className="book-detail-title">{book.title}</h1>
        <p className="book-detail-author">by {book.author_name || 'Unknown author'}</p>
        <p className="book-detail-price">{formatPrice(book.price)}</p>
        <dl className="book-detail-facts">
          <div><dt>Category</dt><dd>{book.category_name || 'Uncategorised'}</dd></div>
          <div><dt>Stock</dt><dd className={Number(book.stock) > 0 ? '' : 'out-of-stock'}>{stockText(book.stock)}</dd></div>
        </dl>
        <h2 className="book-detail-subhead">Description</h2>
        <p className="book-detail-description">{book.description || 'No description yet.'}</p>
      </div>
    </article>
  );
}
