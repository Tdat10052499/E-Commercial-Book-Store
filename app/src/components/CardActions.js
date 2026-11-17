'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Hover bar on a book card (UI polish, outside the Release 1.0 backlog): "View" opens the detail page,
// "Favorite" is remembered in this browser only (localStorage) – no account data, no server call.
// A cart button is deliberately absent: cart and checkout are out of scope for Release 1.0 [03 §2.2].
const KEY = 'pt-favorites';
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };

export default function CardActions({ id, title, href }) {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    const sync = () => setFav(read().includes(id));
    sync();
    window.addEventListener('pt-favorites', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('pt-favorites', sync); window.removeEventListener('storage', sync); };
  }, [id]);

  function toggle() {
    const list = read().filter((x) => x !== id);
    if (!fav) list.push(id);
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* private mode: keep the state for this page only */ }
    setFav(!fav);
    window.dispatchEvent(new Event('pt-favorites'));
  }

  return (
    <div className="card-actions">
      <Link href={href} className="card-action" aria-label={`View ${title}`} title="View details">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
      </Link>
      <button type="button" className={`card-action${fav ? ' is-fav' : ''}`} onClick={toggle} aria-pressed={fav}
        aria-label={fav ? `Remove ${title} from favorites` : `Add ${title} to favorites`} title={fav ? 'Remove from favorites' : 'Add to favorites'}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.4C1.2 8.3 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 5.8 3.8 4.5 7.1C19.5 16.4 12 21 12 21z" /></svg>
      </button>
    </div>
  );
}
