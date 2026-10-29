import Link from 'next/link';
import './globals.css';
import { getCurrentUser } from '@/lib/current-user';
import { logoutAction } from './actions';

export const metadata = {
  title: 'Page Turners Book Store',
  description: 'E-Commercial Book Store – Release 1.0 by Team 6',
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <Link href="/" className="brand">Page Turners</Link>
          <nav>
            {user ? (
              <>
                {user.role === 'admin' && <Link href="/admin">Admin</Link>}
                <span className="who">Hi, {user.name}</span>
                <form action={logoutAction}><button type="submit" className="link">Log out</button></form>
              </>
            ) : (
              <>
                <Link href="/login">Log in</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">Team 6 – Page Turners · Release 1.0</footer>
      </body>
    </html>
  );
}
