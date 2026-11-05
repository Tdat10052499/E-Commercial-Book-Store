import 'server-only';
import { cookies, headers } from 'next/headers';
import { redirect, forbidden } from 'next/navigation';
import { findSessionUser } from '@lib/session';

export const SESSION_COOKIE = 'pt_session';

export async function getCurrentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return findSessionUser(token);
}

// Server-side guard for every admin page and action (US-04).
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

// Roles allowed to manage the catalogue (books, categories, authors). 'staff' added by CR-06 / US-24 (S2-T17).
// Deleting/hiding books, removing categories/authors and account management stay Admin-only (requireAdmin).
export const CATALOG_EDITORS = ['admin', 'staff'];
export const isCatalogEditor = (user) => !!user && CATALOG_EDITORS.includes(user.role);

// Server-side guard for catalogue pages and actions (US-08, US-09; US-04/AC-02 for everyone else).
export async function requireCatalogEditor(nextPath) {
  const user = await getCurrentUser();
  if (!user) {
    const back = nextPath || (await headers()).get('x-pathname') || '/admin';
    redirect(`/login?next=${encodeURIComponent(back)}`);
  }
  if (!CATALOG_EDITORS.includes(user.role)) forbidden();
  return user;
}
