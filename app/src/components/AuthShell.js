export default function AuthShell({ title, lead, children }) {
  return (
    <section className="auth">
      <p className="eyebrow">Page Turners</p>
      <h1>{title}</h1>
      {lead && <p className="muted">{lead}</p>}
      {children}
    </section>
  );
}
