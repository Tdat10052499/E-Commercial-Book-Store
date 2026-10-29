import Link from 'next/link';

// Footer content lives here instead of being hard-coded in the layout; links follow the signed-in role.
const SITE = { name: 'Page Turners', team: 'Team 6', product: 'E-Commercial Book Store', release: 'Release 1.0' };

function linksFor(user) {
  if (!user) return [{ href: '/', label: 'Home' }, { href: '/login', label: 'Log in' }, { href: '/register', label: 'Register' }];
  const links = [{ href: '/', label: 'Home' }];
  if (user.role === 'admin') links.push({ href: '/admin', label: 'Dashboard' }, { href: '/admin/accounts', label: 'Accounts' });
  return links;
}

export default function SiteFooter({ user }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-foot">{SITE.name}</span>
          <span className="muted">{SITE.product} · {SITE.release}</span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {linksFor(user).map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
        <p className="footer-legal">© {year} {SITE.name} · {SITE.team}</p>
      </div>
    </footer>
  );
}
