import Link from 'next/link';

// Image banner with HTML text on top. `variant`: 'tile' (16:9), 'side' (3:4 portrait) or 'strip' (full width).
// The gradient sits under the image, so the banner still looks finished before the artwork is uploaded.
export default function PromoBanner({ banner, variant = 'tile' }) {
  const { image, gradient, eyebrow, title, text, cta, href } = banner;
  return (
    <Link href={href} className={`promo promo-${variant}`} style={{ backgroundImage: `url(${image}), ${gradient}` }}>
      <span className="promo-copy">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <span className="promo-title">{title}</span>
        {text && <span className="promo-text">{text}</span>}
        {cta && <span className="promo-cta">{cta} →</span>}
      </span>
    </Link>
  );
}
