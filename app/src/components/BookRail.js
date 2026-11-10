import Link from 'next/link';
import BookCard from '@/components/BookCard';

// A titled, horizontally scrollable row of book cards (scroll-snap, no JavaScript needed).
export default function BookRail({ id, title, eyebrow, books, href = '/books', linkLabel = 'See all', aside = null }) {
  if (!books.length) return null;
  return (
    <section className={`rail${aside ? ' rail-with-aside' : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="section-head">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={`${id}-title`}>{title}</h2>
        </div>
        <Link href={href} className="muted">{linkLabel} →</Link>
      </div>
      <div className="rail-body">
        {aside}
        <div className="rail-track" tabIndex={0} aria-label={`${title} – scroll for more`}>
          {books.map((b) => <div key={b.id} className="rail-item"><BookCard book={b} /></div>)}
        </div>
      </div>
    </section>
  );
}
