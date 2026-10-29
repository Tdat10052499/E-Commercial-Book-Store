import Link from 'next/link';
import CoverWall from '@/components/CoverWall';
import { getCurrentUser } from '@/lib/current-user';

const ROADMAP = [
  { sprint: 'Sprint 1', title: 'Accounts & roles', text: 'Register, sign in and keep the shop safe with administrator controls.', live: true },
  { sprint: 'Sprint 2', title: 'The catalogue', text: 'Browse at least 30 titles, twelve to a page, newest arrivals first.' },
  { sprint: 'Sprint 3', title: 'Find your next read', text: 'Book details, search by title or author, filter by category and price.' },
];

export default async function HomePage() {
  const user = await getCurrentUser();
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Ms. Le’s bookshops, now online</p>
          <h1>Stories worth<br />turning the page for.</h1>
          <p className="lead">
            {user
              ? `Welcome back, ${user.name}. You are signed in as ${user.role === 'admin' ? 'an Administrator' : 'a Customer'}.`
              : 'A hand-picked catalogue from our stores, on any phone, tablet or desktop.'}
          </p>
          <div className="actions">
            {user?.role === 'admin' && <Link href="/admin/accounts" className="btn">Manage accounts</Link>}
            {!user && <><Link href="/register" className="btn">Create an account</Link><Link href="/login" className="btn-ghost">Log in</Link></>}
          </div>
        </div>
        
      </section>

      <section className="arrivals">
        <div className="section-head"><h2>New arrivals</h2><span className="muted">Catalogue opens in Sprint 2</span></div>
        <CoverWall />
      </section>

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
