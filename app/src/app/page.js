import { getCurrentUser } from '@/lib/current-user';

export default async function HomePage() {
  const user = await getCurrentUser();
  return (
    <section>
      <h1>Welcome to Page Turners</h1>
      <p>{user ? `You are signed in as ${user.name} (${user.role === 'admin' ? 'Administrator' : 'Customer'}).` : 'Register or log in to get started.'}</p>
      <p className="muted">The book catalogue arrives in Sprint 2 (F2, F3).</p>
    </section>
  );
}
