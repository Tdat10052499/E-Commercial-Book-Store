import Link from 'next/link';
import { requireCatalogEditor } from '@/lib/current-user';

export const dynamic = 'force-dynamic';

// Back office for Admin and Store Staff (CR-06 / US-24). Admin-only pages and actions
// (Accounts, hide book, remove category/author) still call requireAdmin themselves and answer 403.
export default async function AdminLayout({ children }) {
  const user = await requireCatalogEditor();
  const isAdmin = user.role === 'admin';
  return (
    <div className="admin">
      <nav className="admin-nav" aria-label="Back office">
        <p className="eyebrow">Back office{isAdmin ? '' : ' · Store Staff'}</p>
        <Link href="/admin">Dashboard</Link>
        {isAdmin && <Link href="/admin/accounts">Accounts</Link>}
        <Link href="/admin/books">Books</Link>
        <Link href="/admin/categories">Categories</Link>
        <Link href="/admin/authors">Authors</Link>
      </nav>
      <div className="admin-main">{children}</div>
    </div>
  );
}
