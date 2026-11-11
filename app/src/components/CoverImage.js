'use client';
import { useEffect, useRef, useState } from 'react';

// <img> for a book cover that falls back to the typographic cover when the file cannot be loaded
// (e.g. a remote demo cover from Open Library is slow or offline), instead of showing a broken image.
export default function CoverImage({ src, title, author, width, height, lazy = true }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  // An image that failed before React hydrated never fires onError, so check it once after mount.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);
  if (!src || failed) {
    return <div className="cover" aria-hidden="true"><span className="cover-title">{title}</span><span className="cover-author">{author}</span></div>;
  }
  return (
    <img ref={ref} src={src} alt={`Cover of ${title}`} width={width} height={height} loading={lazy ? 'lazy' : undefined}
      referrerPolicy="no-referrer" onError={() => setFailed(true)} />
  );
}
