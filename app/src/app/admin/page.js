import { requireAdmin } from '@/lib/current-user';

export default async function AdminDashboard() {
  const admin = await requireAdmin('/admin');
  return (
    <section>
      <h1>Admin dashboard</h1>
      <p>Signed in as {admin.name}. Use <strong>Accounts</strong> to create, lock and unlock accounts.</p>
      <p className="muted">Book, category and author management arrive in Sprint 2 (F2).</p>
    </section>
  );
}
