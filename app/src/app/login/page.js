import Link from 'next/link';
import LoginForm from './LoginForm';

export const metadata = { title: 'Log in – Page Turners' };

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;
  return (
    <section className="narrow">
      <h1>Log in</h1>
      <LoginForm next={next} />
      <p>New here? <Link href="/register">Create an account</Link></p>
    </section>
  );
}
