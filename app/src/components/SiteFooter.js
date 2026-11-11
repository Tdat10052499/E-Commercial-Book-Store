import Link from 'next/link';

// Footer content lives here instead of being hard-coded in the layout; links follow the signed-in role.
const SITE = { name: 'Page Turners', team: 'Team 6', product: 'E-Commercial Book Store', release: 'Release 1.0' };

const SHOP = [{ href: '/', label: 'Home' }, { href: '/books', label: 'All books' }, { href: '/#rail-staff-picks', label: 'Staff picks' }];

// Account column follows the role (US-24/AC-03: Staff never gets the Accounts link).
function accountLinks(user) {
  if (!user) return [{ href: '/login', label: 'Log in' }, { href: '/register', label: 'Register' }];
  if (user.role === 'admin') return [{ href: '/admin', label: 'Dashboard' }, { href: '/admin/accounts', label: 'Accounts' }];
  if (user.role === 'staff') return [{ href: '/admin/books', label: 'Manage books' }];
  return [{ href: '/books', label: 'Find your next read' }];
}

// Collections jump to the category rails on the home page (UI polish).
const COLLECTIONS = [
  { href: '/#rail-novel', label: 'Novels' },
  { href: '/#rail-vietnamese-literature', label: 'Vietnamese literature' },
  { href: '/#rail-fantasy-sci-fi', label: 'Fantasy & Sci-Fi' },
  { href: '/#rail-children', label: 'Children' },
];

function Column({ title, links, label }) {
  return (
    <nav className="footer-col" aria-label={label || title}>
      <p className="footer-head">{title}</p>
      <ul className="footer-links">
        {links.map((l) => <li key={l.href + l.label}><Link href={l.href}>{l.label}</Link></li>)}
      </ul>
    </nav>
  );
}

export default function SiteFooter({ user }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="brand-foot">{SITE.name.toUpperCase()}</Link>
          <p className="footer-about">An online home for Ms. Le’s bookshops: a hand-picked catalogue you can browse from any phone, tablet or desktop.</p>
          <p className="footer-release">{SITE.product} · {SITE.release}</p>
        </div>
        <div className="footer-cols">
          <Column title="Shop" links={SHOP} label="Footer" />
          <Column title="Account" links={accountLinks(user)} />
          <Column title="Collections" links={COLLECTIONS} />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {year} {SITE.name} · {SITE.team}</p>
        <p className="footer-credit">Demo book data and covers: <a href="https://openlibrary.org" rel="noopener" target="_blank">Open Library</a></p>
      </div>
    </footer>
  );
}
