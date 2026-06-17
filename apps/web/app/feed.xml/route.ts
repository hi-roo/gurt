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
  // Immer neueste zuerst — unabhängig davon, wie getArticles sortiert (Sanity liefert bereits
  // absteigend, der Seed-Modus in Einfügereihenfolge). So stimmen Item-Reihenfolge UND der
  // Channel-`pubDate` (= articles[0]) verlässlich.
  const articles = (await getArticles()).slice().sort((a, b) => {
    const da = a.veroeffentlicht ? new Date(a.veroeffentlicht).getTime() : 0;
    const db = b.veroeffentlicht ? new Date(b.veroeffentlicht).getTime() : 0;
    return db - da;
  });

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

  // Channel-Datumsangaben helfen Feed-Readern, Änderungen zu erkennen: `lastBuildDate` =
  // Generierungszeitpunkt (mit On-Demand-Revalidierung stets der neue Stand), `pubDate` =
  // Datum des neuesten Beitrags (articles ist nach `veroeffentlicht` absteigend sortiert).
  const lastBuildDate = new Date().toUTCString();
  const latest = articles.find((a) => a.veroeffentlicht)?.veroeffentlicht;
  const channelPubDate = latest ? new Date(latest).toUTCString() : lastBuildDate;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(SITE_NAME)} — Datenjournalismus</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>de</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${channelPubDate}</pubDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
