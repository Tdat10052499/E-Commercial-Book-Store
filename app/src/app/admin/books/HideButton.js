'use client';
import { useState, useTransition } from 'react';
import { useConfirm } from '@/components/ConfirmDialog';
import { hideBookAction } from './actions';

// US-07: soft delete after confirmation in a styled popup; Cancel, Esc or a click outside changes nothing (AC-02).
export default function HideButton({ id, title }) {
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();
  const [confirm, confirmDialog] = useConfirm();

  async function onClick() {
    const ok = await confirm({ title: `Delete “${title}”?`, message: 'The book will be hidden from the shop. Its record is kept.', confirmLabel: 'Delete', danger: true });
    if (!ok) return;
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
      {confirmDialog}
    </>
  );
}
