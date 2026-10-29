'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { deleteSession } from '@lib/session';
import { SESSION_COOKIE } from '@/lib/current-user';

// US-02/AC-04
export async function logoutAction() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await deleteSession(token);
  store.delete(SESSION_COOKIE);
  redirect('/login');
}
