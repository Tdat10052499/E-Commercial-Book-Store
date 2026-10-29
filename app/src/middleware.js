import { NextResponse } from 'next/server';

// Passes the requested path to server components so the admin guard can send users back to it after login (US-03/AC-06).
export function middleware(request) {
  const headers = new Headers(request.headers);
  headers.set('x-pathname', request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ['/admin/:path*'] };
