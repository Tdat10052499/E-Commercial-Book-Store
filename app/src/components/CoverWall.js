// Placeholder book covers drawn with CSS until real covers arrive with F2 seed data.
const COVERS = [
  { t: 'The Quiet Shelf', a: 'Linh Tran', bg: '#e8e2d6', fg: '#1a1a1a' },
  { t: 'Rivers of Saigon', a: 'Minh Nguyen', bg: '#1f3b4d', fg: '#f4efe6' },
  { t: 'Paper Lanterns', a: 'Hoa Le', bg: '#c8553d', fg: '#fff8ef' },
  { t: 'Notes on Light', a: 'An Pham', bg: '#f2c14e', fg: '#1a1a1a' },
  { t: 'The Last Chapter', a: 'Bao Vo', bg: '#2d2a26', fg: '#f4efe6' },
  { t: 'Monsoon Letters', a: 'Thu Do', bg: '#9bb7a4', fg: '#1a1a1a' },
];

export default function CoverWall() {
  return (
    <div className="cover-wall" aria-hidden="true">
      {COVERS.map((c) => (
        <figure key={c.t} className="cover-item">
          <div className="cover" style={{ background: c.bg, color: c.fg }}>
            <span className="cover-title">{c.t}</span>
            <span className="cover-author">{c.a}</span>
          </div>
          <figcaption><span>{c.t}</span><span className="muted">{c.a}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}
