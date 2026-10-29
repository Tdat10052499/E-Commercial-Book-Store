import Link from 'next/link';
import { requireAdmin } from '@/lib/current-user';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  await requireAdmin();
  return (
    <div className="admin">
      <nav className="admin-nav" aria-label="Admin">
        <p className="eyebrow">Back office</p>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/accounts">Accounts</Link>
        <span className="soon">Books · Sprint 2</span>
        <span className="soon">Categories · Sprint 2</span>
        <span className="soon">Authors · Sprint 2</span>
      </nav>
      <div className="admin-main">{children}</div>
    </div>
  );
}
