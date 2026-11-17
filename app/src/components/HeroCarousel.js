'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Home hero: image banners that replace the promo video. Auto-advances every 6 s, pauses on hover/focus,
// stops for users who prefer reduced motion, and can be driven by arrows, dots or the keyboard.
export default function HeroCarousel({ slides, interval = 6000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);
  const count = slides.length;
  const go = useCallback((i) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  useEffect(() => {
    if (paused || count < 2 || reduced.current) return undefined;
    const t = setTimeout(() => go(index + 1), interval);
    return () => clearTimeout(t);
  }, [index, paused, count, interval, go]);

  if (!count) return null;
  return (
    <section
      className="hero-carousel" aria-roledescription="carousel" aria-label="Featured"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(index - 1); if (e.key === 'ArrowRight') go(index + 1); }}
    >
      <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div
            key={s.title} className="hero-slide" role="group" aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`} aria-hidden={i !== index}
            style={{ backgroundImage: `url(${s.image}), ${s.gradient}` }}
          >
            <div className="hero-slide-copy">
              {s.eyebrow && <p className="eyebrow">{s.eyebrow}</p>}
              <h2>{s.title}</h2>
              {s.text && <p>{s.text}</p>}
              {s.cta && <Link href={s.href} className="btn-light" tabIndex={i === index ? 0 : -1}>{s.cta}</Link>}
            </div>
          </div>
        ))}
      </div>
      {count > 1 && (
        <>
          <button type="button" className="hero-arrow prev" aria-label="Previous slide" onClick={() => go(index - 1)}>‹</button>
          <button type="button" className="hero-arrow next" aria-label="Next slide" onClick={() => go(index + 1)}>›</button>
          <div className="hero-dots">
            {slides.map((s, i) => (
              <button key={s.title} type="button" aria-label={`Show slide ${i + 1}: ${s.title}`} aria-current={i === index}
                className={i === index ? 'active' : ''} onClick={() => go(i)} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
