import Link from 'next/link';
import { requireAdmin } from '@/lib/current-user';
import { listUsers } from '@lib/users';

export default async function AdminDashboard() {
  const admin = await requireAdmin('/admin');
  const users = await listUsers();
  const stats = [
    { label: 'Accounts', value: users.length },
    { label: 'Administrators', value: users.filter((u) => u.role === 'admin').length },
    { label: 'Customers', value: users.filter((u) => u.role === 'customer').length },
    { label: 'Locked', value: users.filter((u) => u.status === 'locked').length },
  ];
  return (
    <section>
      <h1>Admin dashboard</h1>
      <p className="muted">Signed in as {admin.name}.</p>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="card stat"><span className="stat-value">{s.value}</span><span className="stat-label">{s.label}</span></div>
        ))}
      </div>
      <p><Link href="/admin/accounts" className="btn">Manage accounts</Link></p>
    </section>
  );
}
