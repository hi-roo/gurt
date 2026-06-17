import { getArticles } from '../../content/repository';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../../lib/site';

export const revalidate = 3600;

// Cache-Bust-Token für die OG-Bild-URL im Feed: bei jeder OG-Design-Änderung hochsetzen, damit
// Feed-Reader (z. B. Feedly) das neue Vorschaubild nachladen statt das alte zu behalten.
const OG_IMAGE_VERSION = '20260617';

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** RSS-2.0-Feed der veröffentlichten Beiträge. Erreichbar unter /feed.xml. */
export async function GET(): Promise<Response> {
  const articles = await getArticles();

  const items = articles
    .map((article) => {
      const url = `${SITE_URL}/beitrag/${article.slug}`;
      const pubDate = article.veroeffentlicht
        ? `<pubDate>${new Date(article.veroeffentlicht).toUTCString()}</pubDate>`
        : '';
      // OG-Bild je Beitrag als Feed-Vorschaubild — sonst raten Reader es per og:image-Crawl und
      // cachen es pro Artikel (alte Vorschau bleibt hängen). `?v=` bustet bei Design-Änderungen.
      const img = esc(`${SITE_URL}/beitrag/${article.slug}/opengraph-image?v=${OG_IMAGE_VERSION}`);
      return `    <item>
      <title>${esc(article.titel)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate}
      <description>${esc(article.standfirst ?? '')}</description>
      <enclosure url="${img}" type="image/png" length="0" />
      <media:content url="${img}" medium="image" type="image/png" width="1200" height="630" />
      <media:thumbnail url="${img}" width="1200" height="630" />
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(SITE_NAME)} — Datenjournalismus</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>de</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
