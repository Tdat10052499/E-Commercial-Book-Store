import Link from 'next/link';
import { Inter } from 'next/font/google';
import './globals.css';
import { getCurrentUser } from '@/lib/current-user';
import { logoutAction } from './actions';
import SiteFooter from '@/components/SiteFooter';

const sans = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-sans', display: 'swap' });

export const metadata = {
  title: 'Page Turners Book Store',
  description: 'E-Commercial Book Store – Release 1.0 by Team 6',
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            PAGE TURNERS
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
        <SiteFooter user={user} />
      </body>
    </html>
  );
}
