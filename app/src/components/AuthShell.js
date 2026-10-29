import Shelf from './Shelf';

export default function AuthShell({ title, lead, children }) {
  return (
    <section className="auth">
      <aside className="auth-art">
        <p className="eyebrow">Page Turners</p>
        <blockquote>“A reader lives a thousand lives before he dies.”<cite>George R. R. Martin</cite></blockquote>
        <Shelf />
      </aside>
      <div className="auth-form">
        <h1>{title}</h1>
        {lead && <p className="muted">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
