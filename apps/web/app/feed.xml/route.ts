import { getArticles } from '../../content/repository';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../../lib/site';

export const revalidate = 3600;

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
      return `    <item>
      <title>${esc(article.titel)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate}
      <description>${esc(article.standfirst ?? '')}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
