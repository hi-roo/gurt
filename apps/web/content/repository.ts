import 'server-only';
import { isSanityConfigured } from '../sanity/env';
import { sanityFetch } from '../sanity/fetch';
import { articleBySlugQuery, articleSlugsQuery, articlesQuery } from '../sanity/queries';
import { seedArticles } from './seed';
import type {
  Article,
  ArticleSummary,
  DatentabelleBlock,
  ResolvedDatensatz,
  VisualisierungBlock,
} from './types';

/**
 * Zentrale Lese-Schnittstelle für Beiträge. Solange kein Sanity-Projekt
 * konfiguriert ist, kommen die Daten aus dem lokalen Seed — so läuft das
 * Frontend sofort (siehe sanity/env.ts).
 */

function toSummary(article: Article): ArticleSummary {
  return {
    _id: article._id,
    titel: article.titel,
    slug: article.slug,
    standfirst: article.standfirst,
    veroeffentlicht: article.veroeffentlicht,
    themen: article.themen,
  };
}

/** Aus Sanity kommt `datenJson` (String); hier zu `daten` (Array) hydrieren. */
function hydrateDatensatz(datensatz: ResolvedDatensatz | undefined): void {
  if (!datensatz) return;
  const raw = datensatz as ResolvedDatensatz & { datenJson?: string };
  if ((!raw.daten || raw.daten.length === 0) && typeof raw.datenJson === 'string') {
    try {
      const parsed: unknown = JSON.parse(raw.datenJson);
      raw.daten = Array.isArray(parsed) ? (parsed as ResolvedDatensatz['daten']) : [];
    } catch {
      raw.daten = [];
    }
  }
}

function hydrateArticle(article: Article): Article {
  for (const blockItem of article.body) {
    // PortableTextBlock hat `_type: string`, daher kein automatisches Narrowing.
    if (blockItem._type === 'visualisierungBlock') {
      hydrateDatensatz((blockItem as VisualisierungBlock).visualisierung.datensatz);
    } else if (blockItem._type === 'datentabelleBlock') {
      hydrateDatensatz((blockItem as DatentabelleBlock).datensatz);
    }
  }
  return article;
}

export async function getArticles(): Promise<ArticleSummary[]> {
  if (!isSanityConfigured) return seedArticles.map(toSummary);
  return sanityFetch<ArticleSummary[]>(articlesQuery);
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return seedArticles.map((article) => article.slug);
  return sanityFetch<string[]>(articleSlugsQuery);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSanityConfigured) {
    return seedArticles.find((article) => article.slug === slug) ?? null;
  }
  const article = await sanityFetch<Article | null>(articleBySlugQuery, { slug });
  return article ? hydrateArticle(article) : null;
}
