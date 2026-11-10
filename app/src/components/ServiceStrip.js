// Four short promises under the hero, each with a simple line icon.
const ICONS = {
  book: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />,
  device: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></>,
  shield: <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5zM9 12l2 2 4-4" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />,
};

export default function ServiceStrip({ items }) {
  return (
    <ul className="services">
      {items.map((s) => (
        <li key={s.title}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[s.icon]}</svg>
          <span><strong>{s.title}</strong><span className="muted">{s.text}</span></span>
        </li>
      ))}
    </ul>
  );
}
