import Link from 'next/link';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { getCurrentUser } from '@/lib/current-user';
import { logoutAction } from './actions';

const serif = Fraunces({ subsets: ['latin', 'vietnamese'], variable: '--font-serif', display: 'swap' });
const sans = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-sans', display: 'swap' });

export const metadata = {
  title: 'Page Turners Book Store',
  description: 'E-Commercial Book Store – Release 1.0 by Team 6',
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            <span className="brand-mark" aria-hidden="true">P</span>
            <span>Page Turners<small>Booksellers since 2026</small></span>
          </Link>
          <nav>
            {user ? (
              <>
                {user.role === 'admin' && <Link href="/admin">Admin</Link>}
                <span className="who">Hi, {user.name}</span>
                <form action={logoutAction}><button type="submit" className="btn-ghost">Log out</button></form>
              </>
            ) : (
              <>
                <Link href="/login">Log in</Link>
                <Link href="/register" className="btn-pill">Register</Link>
              </>
            )}
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <span className="brand-foot">Page Turners</span>
          <span>Team 6 · E-Commercial Book Store · Release 1.0</span>
        </footer>
      </body>
    </html>
  );
}
