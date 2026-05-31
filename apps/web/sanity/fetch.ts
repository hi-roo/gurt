import 'server-only';
import { draftMode } from 'next/headers';
import { client } from './client';

const token = process.env.SANITY_API_READ_TOKEN;

/**
 * Serverseitiger Lese-Zugriff. Im Draft-Mode (Visual Editing) werden Entwürfe mit
 * Token geladen, sonst veröffentlichte Inhalte vom CDN. Siehe docs/01-architecture.md.
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
    useCdn: true,
    next: { revalidate: 60 },
  });
}
