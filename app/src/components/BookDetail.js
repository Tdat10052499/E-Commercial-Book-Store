import { formatPrice } from '@lib/catalog-validation';
import { coverSrc } from '@/components/BookCard';

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
        {src
          ? <img src={src} alt={`Cover of ${book.title}`} width={400} height={600} />
          : <div className="cover" aria-hidden="true"><span className="cover-title">{book.title}</span><span className="cover-author">{book.author_name}</span></div>}
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
