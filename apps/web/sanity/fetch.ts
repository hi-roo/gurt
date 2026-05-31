import 'server-only';
import { draftMode } from 'next/headers';
import { client } from './client';

const token = process.env.SANITY_API_READ_TOKEN;

/**
 * Serverseitiger Lese-Zugriff. Im Draft-Mode (Visual Editing) werden Entwürfe mit
 * Token geladen. Für veröffentlichte Inhalte: ist ein Read-Token gesetzt, wird
 * authentifiziert gelesen (nötig, wenn das Dataset nicht öffentlich lesbar ist),
 * sonst über das öffentliche CDN. Siehe docs/01-architecture.md.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const { isEnabled } = await draftMode();

  if (isEnabled && token) {
    return client.fetch<T>(query, params, {
      token,
      perspective: 'drafts',
      useCdn: false,
      stega: true,
      next: { revalidate: 0 },
    });
  }

  return client.fetch<T>(query, params, {
    perspective: 'published',
    ...(token ? { token, useCdn: false } : { useCdn: true }),
    next: { revalidate: 60 },
  });
}
