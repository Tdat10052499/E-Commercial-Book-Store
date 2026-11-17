import Link from 'next/link';
import CoverWall from '@/components/CoverWall';
import BookCard from '@/components/BookCard';
import BookRail from '@/components/BookRail';
import HeroCarousel from '@/components/HeroCarousel';
import PromoBanner from '@/components/PromoBanner';
import ServiceStrip from '@/components/ServiceStrip';
import { getCurrentUser } from '@/lib/current-user';
import {
  HERO_SLIDES, PROMO_TILES, SIDE_BANNER, STRIP_BANNER, STAFF_PICKS, CATEGORY_RAILS, SERVICES, slug,
} from '@/lib/home-content';
import { listBooksPage } from '@lib/catalog';
import { listBooksInCategory, listBooksBySeedKeys, listCategoryCounts } from '@lib/showcase';
import { ROLE_LABEL } from '@lib/validation';

export const dynamic = 'force-dynamic';

// DEF-S3-01: every role gets its own label (a Store Staff user was called "a Customer").
const withArticle = (label) => `${/^[AEIOU]/i.test(label) ? 'an' : 'a'} ${label}`;

const ROADMAP = [
  { sprint: 'Sprint 1', title: 'Accounts & roles', text: 'Register, sign in and keep the shop safe with administrator controls.', live: true },
  { sprint: 'Sprint 2', title: 'The catalogue', text: 'Browse at least 30 titles, twelve to a page, newest arrivals first.', live: true },
  { sprint: 'Sprint 3', title: 'Find your next read', text: 'Book details, search by title or author, filter by category and price.' },
];

export default async function HomePage() {
  const user = await getCurrentUser();
  const [{ books }, picks, categories, rails] = await Promise.all([
    listBooksPage(1, {}, 12),
    listBooksBySeedKeys(STAFF_PICKS),
    listCategoryCounts(1),
    Promise.all(CATEGORY_RAILS.map(async (name) => ({ name, books: await listBooksInCategory(name, 12) }))),
  ]);
  const railNames = new Set(rails.filter((r) => r.books.length).map((r) => r.name));

  return (
    <>
      <HeroCarousel slides={HERO_SLIDES} />

      <section className="hero hero-welcome">
        <div className="hero-copy">
          <p className="eyebrow">Ms. Le’s bookshops, now online</p>
          <h1>Stories worth turning the page for.</h1>
          <p className="lead">
            {user
              ? `Welcome back, ${user.name}. You are signed in as ${withArticle(ROLE_LABEL[user.role] || 'Customer')}.`
              : 'A hand-picked catalogue from our stores, on any phone, tablet or desktop.'}
          </p>
          <div className="actions">
            {user?.role === 'admin' && <Link href="/admin/accounts" className="btn">Manage accounts</Link>}
            <Link href="/books" className={user ? 'btn-ghost' : 'btn'}>Browse books</Link>
            {!user && <><Link href="/register" className="btn-ghost">Create an account</Link><Link href="/login" className="btn-ghost">Log in</Link></>}
          </div>
        </div>
        <ServiceStrip items={SERVICES} />
      </section>

      <section className="promo-grid" aria-label="Collections">
        {PROMO_TILES.map((p) => <PromoBanner key={p.title} banner={p} />)}
      </section>

      <section className="arrivals">
        <div className="section-head"><h2>New arrivals</h2><Link href="/books" className="muted">See all books →</Link></div>
        {books.length ? <div className="book-grid arrivals-grid">{books.map((b) => <BookCard key={b.id} book={b} />)}</div> : <CoverWall />}
      </section>

      <BookRail
        id="rail-staff-picks" eyebrow="Hand-picked" title="Staff picks" books={picks}
        aside={<PromoBanner banner={SIDE_BANNER} variant="side" />}
      />

      {categories.length > 0 && (
        <section className="shop-categories" aria-labelledby="shop-categories-title">
          <h2 id="shop-categories-title">Shop by category</h2>
          <ul className="category-chips">
            {categories.map((c) => (
              <li key={c.name}>
                <Link href={railNames.has(c.name) ? `/#rail-${slug(c.name)}` : '/books'}>
                  <span>{c.name}</span><span className="muted">{c.n}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {rails.map((r) => <BookRail key={r.name} id={`rail-${slug(r.name)}`} eyebrow="Category" title={r.name} books={r.books} />)}

      <PromoBanner banner={STRIP_BANNER} variant="strip" />

      <section className="roadmap">
        <h2>What’s on the shelf</h2>
        <div className="roadmap-grid">
          {ROADMAP.map((r) => (
            <article key={r.sprint} className={`card roadmap-card${r.live ? ' live' : ''}`}>
              <p className="eyebrow">{r.sprint}{r.live ? ' · available now' : ' · coming soon'}</p>
              <h3>{r.title}</h3>
              <p className="muted">{r.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
