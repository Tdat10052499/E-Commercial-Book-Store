import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import RegisterForm from './RegisterForm';

export const metadata = { title: 'Register – Page Turners' };

export default function RegisterPage() {
  return (
    <AuthShell title="Create an account" lead="Join Page Turners to keep track of the books you love.">
      <RegisterForm />
      <p className="switch">Already registered? <Link href="/login">Log in</Link></p>
    </AuthShell>
  );
}
