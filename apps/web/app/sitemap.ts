import type { MetadataRoute } from 'next';
import { getArticles, getRessorts, getThemes } from '../content/repository';
import { SITE_URL } from '../lib/site';

// ISR: stündlich regenerieren, damit neue Beiträge in der Sitemap auftauchen.
export const revalidate = 3600;

/** Dynamische Sitemap aus Beiträgen + Themen + statischen Seiten. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, themes, ressorts] = await Promise.all([getArticles(), getThemes(), getRessorts()]);

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/themen`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/ueber`, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/beitrag/${article.slug}`,
    lastModified: article.veroeffentlicht ? new Date(article.veroeffentlicht) : undefined,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const themeEntries: MetadataRoute.Sitemap = themes.map((thema) => ({
    url: `${SITE_URL}/thema/${thema.slug}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const ressortEntries: MetadataRoute.Sitemap = ressorts.map((ressort) => ({
    url: `${SITE_URL}/ressort/${ressort.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticEntries, ...ressortEntries, ...articleEntries, ...themeEntries];
}
