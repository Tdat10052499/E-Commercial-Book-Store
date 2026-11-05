import Link from 'next/link';
import { requireCatalogEditor } from '@/lib/current-user';
import { listUsers } from '@lib/users';
import { countVisibleBooks } from '@lib/catalog';

export default async function AdminDashboard() {
  const user = await requireCatalogEditor('/admin');
  const books = await countVisibleBooks();
  if (user.role !== 'admin') {
    // Store Staff (US-24): catalogue work only, no account figures.
    return (
      <section>
        <h1>Back office</h1>
        <p className="muted">Signed in as {user.name} (Store Staff). You can add and edit books and manage categories and authors.</p>
        <div className="stats"><div className="card stat"><span className="stat-value">{books}</span><span className="stat-label">Visible books</span></div></div>
        <p><Link href="/admin/books" className="btn">Manage books</Link></p>
      </section>
    );
  }
  const users = await listUsers();
  const stats = [
    { label: 'Accounts', value: users.length },
    { label: 'Administrators', value: users.filter((u) => u.role === 'admin').length },
    { label: 'Store Staff', value: users.filter((u) => u.role === 'staff').length },
    { label: 'Customers', value: users.filter((u) => u.role === 'customer').length },
    { label: 'Locked', value: users.filter((u) => u.status === 'locked').length },
    { label: 'Visible books', value: books },
  ];
  return (
    <section>
      <h1>Admin dashboard</h1>
      <p className="muted">Signed in as {user.name}.</p>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="card stat"><span className="stat-value">{s.value}</span><span className="stat-label">{s.label}</span></div>
        ))}
      </div>
      <p><Link href="/admin/accounts" className="btn">Manage accounts</Link> <Link href="/admin/books" className="btn btn-ghost">Manage books</Link></p>
    </section>
  );
}
