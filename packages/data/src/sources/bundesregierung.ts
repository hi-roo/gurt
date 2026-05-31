import { getText } from '../lib/http';

/**
 * Helfer für bundesregierung.de & Ministerien. Kein offizielles JSON-API —
 * strukturierte Inhalte kommen als RSS/HTML und werden REDAKTIONELL kuratiert,
 * nie automatisch als „Fakt" publiziert (siehe docs/04 & docs/07).
 */

export interface FeedItem {
  title: string;
  link: string;
  pubDate?: string;
}

/** Naive, aber robuste RSS-Item-Extraktion. Rein → testbar. */
export function parseRssItems(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/g) ?? [];

  const pick = (block: string, tag: string): string | undefined => {
    const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
    if (!match?.[1]) return undefined;
    return match[1].replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '').trim();
  };

  for (const block of blocks) {
    const title = pick(block, 'title');
    const link = pick(block, 'link');
    if (title && link) {
      items.push({ title, link, pubDate: pick(block, 'pubDate') });
    }
  }
  return items;
}

/** Lädt einen RSS-Feed und extrahiert Einträge (Titel + Link). */
export async function fetchFeed(url: string): Promise<FeedItem[]> {
  const xml = await getText(url, {
    accept: 'application/rss+xml, application/xml, text/xml',
  });
  return parseRssItems(xml);
}
