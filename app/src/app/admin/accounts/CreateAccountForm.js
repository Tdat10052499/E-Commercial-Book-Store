'use client';
import { useActionState, useState } from 'react';
import Field from '@/components/Field';
import { LIMITS, validateAccount } from '@lib/validation';
import { createAccountAction } from './actions';

export default function CreateAccountForm() {
  const [state, formAction, pending] = useActionState(createAccountAction, {});
  const [clientErrors, setClientErrors] = useState({});
  const errors = { ...state.errors, ...clientErrors };

  function onSubmit(e) {
    const found = validateAccount(Object.fromEntries(new FormData(e.currentTarget)), { requireRole: true });
    setClientErrors(found);
    if (Object.keys(found).length) e.preventDefault();
  }

  return (
    <form key={state.key} action={formAction} onSubmit={onSubmit} noValidate className="card form">
      <h2>Create account</h2>
      {state.message && <p className="success" role="status">{state.message}</p>}
      <Field label="Full name" name="name" required maxLength={LIMITS.name} defaultValue={state.values?.name} error={errors.name} />
      <Field label="Email" name="email" type="email" required maxLength={LIMITS.email} defaultValue={state.values?.email} error={errors.email} />
      <Field label="Initial password" name="password" type="password" required minLength={LIMITS.passwordMin}
        maxLength={LIMITS.passwordMax} error={errors.password} />
      <div className="field">
        <label htmlFor="f-role">Role</label>
        <select id="f-role" name="role" defaultValue={state.values?.role || 'customer'}>
          <option value="customer">Customer</option>
          <option value="admin">Administrator</option>
        </select>
        {errors.role && <p className="error" role="alert">{errors.role}</p>}
      </div>
      <button type="submit" disabled={pending}>{pending ? 'Creating…' : 'Create account'}</button>
    </form>
  );
}
