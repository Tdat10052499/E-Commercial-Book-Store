import 'server-only';
import { cookies } from 'next/headers';
import { redirect, forbidden } from 'next/navigation';
import { findSessionUser } from '@lib/session';

export const SESSION_COOKIE = 'pt_session';

export async function getCurrentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return findSessionUser(token);
}

// Server-side guard for every admin page and action (US-04).
export async function requireAdmin(nextPath = '/admin') {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  if (user.role !== 'admin') forbidden();
  return user;
}
