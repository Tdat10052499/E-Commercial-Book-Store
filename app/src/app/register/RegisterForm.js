'use client';
import { useActionState, useState } from 'react';
import Field from '@/components/Field';
import { LIMITS, validateAccount } from '@lib/validation';
import { registerAction } from './actions';

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, {});
  const [clientErrors, setClientErrors] = useState({});
  const errors = { ...state.errors, ...clientErrors };

  function onSubmit(e) {
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const found = validateAccount(data);
    setClientErrors(found);
    if (Object.keys(found).length) e.preventDefault();
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="card form">
      <Field label="Full name" name="name" required maxLength={LIMITS.name} defaultValue={state.values?.name} error={errors.name} />
      <Field label="Email" name="email" type="email" required maxLength={LIMITS.email} defaultValue={state.values?.email} error={errors.email} />
      <Field label="Password (8–64 characters, letters and digits)" name="password" type="password" required
        minLength={LIMITS.passwordMin} maxLength={LIMITS.passwordMax} error={errors.password} />
      <button type="submit" disabled={pending}>{pending ? 'Creating…' : 'Create account'}</button>
    </form>
  );
}
