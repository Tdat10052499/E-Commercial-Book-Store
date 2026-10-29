import 'server-only';
import { cookies } from 'next/headers';
import { createSession } from '@lib/session';
import { SESSION_COOKIE } from '@/lib/current-user';

export async function startSession(userId) {
  const { token, expiresAt } = await createSession(userId);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  });
}
