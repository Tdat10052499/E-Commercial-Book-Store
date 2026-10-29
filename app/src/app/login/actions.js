'use server';
import { redirect } from 'next/navigation';
import { authenticate } from '@lib/users';
import { startSession } from '@/lib/start-session';

const safeNext = (next) => (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : '/');

// US-02/AC-01..03, AC-05
export async function loginAction(_prev, formData) {
  const email = formData.get('email');
  const { user, error } = await authenticate(email, formData.get('password'));
  if (error) return { error, values: { email } };
  await startSession(user.id);
  redirect(safeNext(formData.get('next')));
}
