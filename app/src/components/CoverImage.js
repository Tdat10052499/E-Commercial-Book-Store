'use client';
import { useState } from 'react';

// <img> for a book cover that falls back to the typographic cover when the file cannot be loaded
// (e.g. a remote demo cover from Open Library is slow or offline), instead of showing a broken image.
export default function CoverImage({ src, title, author, width, height, lazy = true }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className="cover" aria-hidden="true"><span className="cover-title">{title}</span><span className="cover-author">{author}</span></div>;
  }
  return (
    <img src={src} alt={`Cover of ${title}`} width={width} height={height} loading={lazy ? 'lazy' : undefined}
      referrerPolicy="no-referrer" onError={() => setFailed(true)} />
  );
}
