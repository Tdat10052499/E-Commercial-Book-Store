import Link from 'next/link';
import RegisterForm from './RegisterForm';

export const metadata = { title: 'Register – Page Turners' };

export default function RegisterPage() {
  return (
    <section className="narrow">
      <h1>Create an account</h1>
      <RegisterForm />
      <p>Already registered? <Link href="/login">Log in</Link></p>
    </section>
  );
}
