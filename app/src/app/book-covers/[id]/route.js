import { getCover } from '@lib/catalog';

// Serves a cover uploaded through the book form (US-05). Hidden or unknown books get 404.
export async function GET(_request, { params }) {
  const { id } = await params;
  const cover = await getCover(id);
  if (!cover) return new Response('Not found', { status: 404 });
  return new Response(cover.cover_data, {
    headers: { 'Content-Type': cover.cover_mime, 'Cache-Control': 'public, max-age=300' },
  });
}
