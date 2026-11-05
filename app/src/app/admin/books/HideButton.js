'use client';
import { useState, useTransition } from 'react';
import { hideBookAction } from './actions';

// US-07: soft delete after confirmation; Cancel changes nothing (AC-02).
export default function HideButton({ id, title }) {
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!window.confirm(`Delete “${title}”? It will be hidden from the shop; its record is kept.`)) return;
    const fd = new FormData();
    fd.set('id', id);
    startTransition(async () => {
      const result = await hideBookAction(fd);
      setError(result?.error || null);
    });
  }

  return (
    <>
      <button type="button" className="danger" onClick={onClick} disabled={pending}>{pending ? 'Deleting…' : 'Delete'}</button>
      {error && <p className="error" role="alert">{error}</p>}
    </>
  );
}
