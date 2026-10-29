'use client';
import { useState, useTransition } from 'react';
import { setStatusAction } from './actions';

export default function StatusButton({ id, status, label }) {
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  function onClick() {
    const fd = new FormData();
    fd.set('id', id);
    fd.set('status', status);
    startTransition(async () => {
      const result = await setStatusAction(fd);
      setError(result?.error || null);
    });
  }

  return (
    <>
      <button type="button" className={status === 'locked' ? 'danger' : ''} onClick={onClick} disabled={pending}>{label}</button>
      {error && <span className="error" role="alert"> {error}</span>}
    </>
  );
}
