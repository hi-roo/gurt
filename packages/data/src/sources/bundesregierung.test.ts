import { describe, expect, it } from 'vitest';
import { parseRssItems } from './bundesregierung';

const xml = `<rss><channel>
  <item><title><![CDATA[Pressemitteilung A]]></title><link>https://example.org/a</link><pubDate>Mon, 01 Jan 2026 09:00:00 GMT</pubDate></item>
  <item><title>Pressemitteilung B</title><link>https://example.org/b</link></item>
  <item><title>Ohne Link</title></item>
</channel></rss>`;

describe('parseRssItems', () => {
  it('extrahiert Titel und Links und entfernt CDATA', () => {
    const items = parseRssItems(xml);
    expect(items).toHaveLength(2); // der Eintrag ohne Link wird verworfen
    expect(items[0]?.title).toBe('Pressemitteilung A');
    expect(items[0]?.pubDate).toContain('2026');
    expect(items[1]?.link).toBe('https://example.org/b');
  });
});
