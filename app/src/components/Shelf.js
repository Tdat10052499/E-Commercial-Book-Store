// Decorative row of book spines drawn with CSS (no images to load).
const SPINES = [
  { h: 92, w: 22, c: 'var(--spine-1)' }, { h: 78, w: 30, c: 'var(--spine-2)' },
  { h: 100, w: 18, c: 'var(--spine-3)' }, { h: 86, w: 26, c: 'var(--spine-4)' },
  { h: 70, w: 34, c: 'var(--spine-5)', tilt: true }, { h: 96, w: 20, c: 'var(--spine-1)' },
  { h: 82, w: 28, c: 'var(--spine-3)' }, { h: 90, w: 24, c: 'var(--spine-2)' },
  { h: 76, w: 32, c: 'var(--spine-4)' }, { h: 98, w: 18, c: 'var(--spine-5)' },
];

export default function Shelf({ className = '' }) {
  return (
    <div className={`shelf ${className}`} aria-hidden="true">
      {SPINES.map((s, i) => (
        <span key={i} className={`spine${s.tilt ? ' tilt' : ''}`}
          style={{ height: `${s.h}%`, width: s.w, background: s.c }} />
      ))}
    </div>
  );
}
