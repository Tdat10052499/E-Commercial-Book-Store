'use client';
import { useActionState } from 'react';
import Field from '@/components/Field';
import { loginAction } from './actions';

export default function LoginForm({ next }) {
  const [state, formAction, pending] = useActionState(loginAction, {});
  return (
    <form action={formAction} className="card form">
      {state.error && <p className="error banner" role="alert">{state.error}</p>}
      <input type="hidden" name="next" value={next || '/'} />
      <Field label="Email" name="email" type="email" required defaultValue={state.values?.email} />
      <Field label="Password" name="password" type="password" required />
      <button type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Log in'}</button>
    </form>
  );
}
