import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

/**
 * Aktiviert den Draft-Mode für Visual Editing (vom Sanity-Presentation-Tool aufgerufen).
 * Validiert gegen SANITY_PREVIEW_SECRET. Für Produktion ggf. mit
 * @sanity/preview-url-secret härten.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const secret = request.nextUrl.searchParams.get('secret');
  const redirectTo = request.nextUrl.searchParams.get('sanity-preview-pathname') ?? '/';

  if (!process.env.SANITY_PREVIEW_SECRET || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Ungültiges Preview-Secret.', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(redirectTo);
}
