import 'server-only';
import { cookies, headers } from 'next/headers';
import { redirect, forbidden } from 'next/navigation';
import { findSessionUser } from '@lib/session';

export const SESSION_COOKIE = 'pt_session';

export async function getCurrentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return findSessionUser(token);
}

// Server-side guard for every admin page and action (US-03).
// Without an explicit path it returns to the requested URL, set by src/middleware.js.
export async function requireAdmin(nextPath) {
  const user = await getCurrentUser();
  if (!user) {
    const back = nextPath || (await headers()).get('x-pathname') || '/admin';
    redirect(`/login?next=${encodeURIComponent(back)}`);
  }
  if (user.role !== 'admin') forbidden();
  return user;
}
