import Link from 'next/link';

export default function Forbidden() {
  return (
    <section className="card" style={{ maxWidth: 520, margin: '40px auto', textAlign: 'center' }}>
      <p className="eyebrow">Error 403</p>
      <h1>Access denied</h1>
      <p className="muted">You do not have permission to open this page.</p>
      <Link href="/" className="btn">Back to home</Link>
    </section>
  );
}
