import Link from 'next/link';
import { requireAdmin } from '@/lib/current-user';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  await requireAdmin();
  return (
    <div className="admin">
      <nav className="subnav">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/accounts">Accounts</Link>
      </nav>
      {children}
    </div>
  );
}
