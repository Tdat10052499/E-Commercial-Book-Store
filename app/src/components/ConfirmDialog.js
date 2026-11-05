'use client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

// Styled confirmation popup that replaces window.confirm (US-07/AC-02 and the other confirm steps).
// Usage: const [confirm, confirmDialog] = useConfirm();
//        if (!(await confirm({ title, message, confirmLabel, danger: true }))) return;
//        … and render {confirmDialog} somewhere inside the component.
export function useConfirm() {
  const [request, setRequest] = useState(null);
  const confirm = useCallback((options) => new Promise((resolve) => setRequest({ ...options, resolve })), []);
  const close = useCallback((ok) => {
    setRequest((r) => { r?.resolve(ok); return null; });
  }, []);
  const dialog = request ? <ConfirmDialog {...request} onClose={close} /> : null;
  return [confirm, dialog];
}

function ConfirmDialog({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger = false, onClose }) {
  const ref = useRef(null);
  const id = useId();
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal(); // modal: focus stays inside, the page behind is inert
  }, []);
  return (
    <dialog
      ref={ref}
      className="confirm"
      aria-labelledby={`${id}-t`}
      aria-describedby={`${id}-m`}
      onCancel={(e) => { e.preventDefault(); onClose(false); }}      // Esc = Cancel
      onClick={(e) => { if (e.target === ref.current) onClose(false); }} // click outside = Cancel
    >
      <div className="confirm-body">
        <h2 id={`${id}-t`} className="confirm-title">{title}</h2>
        {message && <p id={`${id}-m`} className="confirm-message">{message}</p>}
        <div className="confirm-actions">
          <button type="button" className="btn-ghost" onClick={() => onClose(false)} autoFocus>{cancelLabel}</button>
          <button type="button" className={danger ? 'confirm-danger' : ''} onClick={() => onClose(true)}>{confirmLabel}</button>
        </div>
      </div>
    </dialog>
  );
}
