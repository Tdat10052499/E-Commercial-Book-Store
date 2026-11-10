'use client';
import { useState, useTransition } from 'react';
import { ROLES, ROLE_LABEL } from '@lib/validation';
import { useConfirm } from '@/components/ConfirmDialog';
import { setRoleAction } from './actions';

// US-24/AC-04: the new role applies from the user's next login (their sessions are ended).
export default function RoleSelect({ id, role, name }) {
  const [value, setValue] = useState(role);
  const [note, setNote] = useState(null);
  const [pending, startTransition] = useTransition();
  const [confirm, confirmDialog] = useConfirm();

  async function onChange(e) {
    const select = e.currentTarget;
    const next = select.value;
    const ok = await confirm({
      title: `Change the role of ${name} to ${ROLE_LABEL[next]}?`,
      message: 'They will be signed out and get the new permissions at their next login.',
      confirmLabel: 'Change role',
    });
    if (!ok) { select.value = value; return; }
    const fd = new FormData();
    fd.set('id', id);
    fd.set('role', next);
    startTransition(async () => {
      const result = await setRoleAction(fd);
      if (result?.error) { setNote({ error: result.error }); select.value = value; return; }
      setValue(next);
      setNote({ ok: result?.unchanged ? 'No change' : 'Role changed – applies at next login' });
    });
  }

  return (
    <>
      <label htmlFor={`role-${id}`} className="sr-only">Role of {name}</label>
      <select id={`role-${id}`} defaultValue={role} onChange={onChange} disabled={pending}>
        {ROLES.map((r) => <option key={r} value={r}>{ROLE_LABEL[r]}</option>)}
      </select>
      {note?.error && <p className="error" role="alert">{note.error}</p>}
      {note?.ok && <p className="success small" role="status">{note.ok}</p>}
      {confirmDialog}
    </>
  );
}
