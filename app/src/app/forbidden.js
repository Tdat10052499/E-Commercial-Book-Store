import Link from 'next/link';

export default function Forbidden() {
  return (
    <section>
      <h1>Access denied</h1>
      <p>You do not have permission to open this page.</p>
      <Link href="/">Back to home</Link>
    </section>
  );
}
