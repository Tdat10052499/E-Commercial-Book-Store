import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>Sorry, we could not find that page.</p>
      <Link href="/">Back to home</Link>
    </section>
  );
}
