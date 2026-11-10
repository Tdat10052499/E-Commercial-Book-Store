import Link from 'next/link';

// Footer content lives here instead of being hard-coded in the layout; links follow the signed-in role.
const SITE = { name: 'Page Turners', team: 'Team 6', product: 'E-Commercial Book Store', release: 'Release 1.0' };

function linksFor(user) {
  if (!user) return [{ href: '/', label: 'Home' }, { href: '/books', label: 'Books' }, { href: '/login', label: 'Log in' }, { href: '/register', label: 'Register' }];
  const links = [{ href: '/', label: 'Home' }, { href: '/books', label: 'Books' }];
  if (user.role === 'admin') links.push({ href: '/admin', label: 'Dashboard' }, { href: '/admin/accounts', label: 'Accounts' });
  if (user.role === 'staff') links.push({ href: '/admin/books', label: 'Manage books' });
  return links;
}

// Collections jump to the category rails on the home page (UI polish).
const COLLECTIONS = [
  { href: '/#rail-staff-picks', label: 'Staff picks' },
  { href: '/#rail-novel', label: 'Novels' },
  { href: '/#rail-vietnamese-literature', label: 'Vietnamese literature' },
  { href: '/#rail-children', label: 'Children' },
];

export default function SiteFooter({ user }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-foot">{SITE.name}</span>
          <span className="muted">{SITE.product} · {SITE.release}</span>
          <p className="footer-about">An online home for Ms. Le’s bookshops: a hand-picked catalogue you can browse from any device.</p>
        </div>
        <div className="footer-cols">
          <nav className="footer-col" aria-label="Footer">
            <p className="footer-head">Shop</p>
            <div className="footer-links">{linksFor(user).map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div>
          </nav>
          <nav className="footer-col" aria-label="Collections">
            <p className="footer-head">Collections</p>
            <div className="footer-links">{COLLECTIONS.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div>
          </nav>
        </div>
        <p className="footer-legal">
          © {year} {SITE.name} · {SITE.team}
          <span className="footer-credit">Book data and cover images for demo titles: <a href="https://openlibrary.org" rel="noopener" target="_blank">Open Library</a>.</span>
        </p>
      </div>
    </footer>
  );
}
