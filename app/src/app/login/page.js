import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import LoginForm from './LoginForm';

export const metadata = { title: 'Log in – Page Turners' };

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;
  return (
    <AuthShell title="Welcome back" lead="Log in to continue to Page Turners.">
      <LoginForm next={next} />
      <p className="switch">New here? <Link href="/register">Create an account</Link></p>
    </AuthShell>
  );
}
