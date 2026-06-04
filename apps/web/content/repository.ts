import 'server-only';
import { client } from '../sanity/client';
import { isSanityConfigured } from '../sanity/env';
import { sanityFetch } from '../sanity/fetch';
import { articleBySlugQuery, articleSlugsQuery, articlesQuery, searchIndexQuery } from '../sanity/queries';
import { seedArticles } from './seed';
import { RESSORTS, ressortBySlug, type Ressort } from './ressorts';
import type {
  Article,
  ArticleSummary,
  BodyBlock,
  DatentabelleBlock,
  ResolvedDatensatz,
  SearchDoc,
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
    ressort: article.ressort,
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

/**
 * Build-sicherer Lese-Zugriff OHNE draftMode() — nutzbar in generateStaticParams
 * (kein Request-Scope) und für Listen/Header. Veröffentlichte Inhalte; mit Read-Token,
 * falls das Dataset nicht öffentlich lesbar ist.
 */
const readToken = process.env.SANITY_API_READ_TOKEN;
function fetchPublished<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return client.fetch<T>(query, params, {
    perspective: 'published',
    ...(readToken ? { token: readToken, useCdn: false } : { useCdn: true }),
  });
}

export async function getArticles(): Promise<ArticleSummary[]> {
  if (!isSanityConfigured) return seedArticles.map(toSummary);
  return fetchPublished<ArticleSummary[]>(articlesQuery);
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return seedArticles.map((article) => article.slug);
  return fetchPublished<string[]>(articleSlugsQuery);
}

/** Fließtext eines Beitrags flach ziehen (nur Standard-Textblöcke) — Seed-Pendant zu pt::text(body). */
function flattenBody(body: BodyBlock[]): string {
  const parts: string[] = [];
  for (const blockItem of body) {
    if (blockItem._type !== 'block') continue;
    const children = (blockItem as { children?: { text?: unknown }[] }).children ?? [];
    for (const child of children) {
      if (typeof child.text === 'string') parts.push(child.text);
    }
  }
  return parts.join(' ');
}

/** Flacher Volltext-Index über alle veröffentlichten Beiträge (für /suche). */
export async function getSearchIndex(): Promise<SearchDoc[]> {
  if (!isSanityConfigured) {
    return seedArticles.map((article) => ({
      slug: article.slug,
      titel: article.titel,
      standfirst: article.standfirst ?? '',
      themen: article.themen ?? [],
      text: flattenBody(article.body),
    }));
  }
  return fetchPublished<SearchDoc[]>(searchIndexQuery);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSanityConfigured) {
    return seedArticles.find((article) => article.slug === slug) ?? null;
  }
  const article = await sanityFetch<Article | null>(articleBySlugQuery, { slug });
  return article ? hydrateArticle(article) : null;
}

export interface ThemeSummary {
  name: string;
  slug: string;
  count: number;
}

/** Themenfelder, abgeleitet aus den veröffentlichten Beiträgen (nach Anzahl sortiert). */
export async function getThemes(): Promise<ThemeSummary[]> {
  const articles = await getArticles();
  const bySlug = new Map<string, ThemeSummary>();
  for (const article of articles) {
    for (const thema of article.themen ?? []) {
      if (!thema.slug) continue;
      const existing = bySlug.get(thema.slug);
      if (existing) existing.count += 1;
      else bySlug.set(thema.slug, { name: thema.name, slug: thema.slug, count: 1 });
    }
  }
  return [...bySlug.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'de'));
}

/** Ein Themenfeld mit seinen Beiträgen (null, wenn es keine gibt). */
export async function getThemeBySlug(
  slug: string,
): Promise<{ theme: ThemeSummary; articles: ArticleSummary[] } | null> {
  const articles = await getArticles();
  const inTheme = articles.filter((article) => article.themen?.some((t) => t.slug === slug));
  if (inTheme.length === 0) return null;
  const name = inTheme[0]?.themen?.find((t) => t.slug === slug)?.name ?? slug;
  return { theme: { name, slug, count: inTheme.length }, articles: inTheme };
}

export interface RessortSummary extends Ressort {
  count: number;
}

/** Ressorts mit mindestens einem Beitrag, in fester Reihenfolge (Top-Navigation). */
export async function getRessorts(): Promise<RessortSummary[]> {
  const articles = await getArticles();
  const counts = new Map<string, number>();
  for (const article of articles) {
    if (article.ressort) counts.set(article.ressort, (counts.get(article.ressort) ?? 0) + 1);
  }
  return RESSORTS.filter((r) => counts.has(r.slug)).map((r) => ({ ...r, count: counts.get(r.slug) ?? 0 }));
}

/** Ein Ressort mit seinen Beiträgen (null, wenn es keine gibt). */
export async function getRessortBySlug(
  slug: string,
): Promise<{ ressort: Ressort; articles: ArticleSummary[] } | null> {
  const ressort = ressortBySlug(slug);
  if (!ressort) return null;
  const articles = await getArticles();
  const inRessort = articles.filter((article) => article.ressort === slug);
  if (inRessort.length === 0) return null;
  return { ressort, articles: inRessort };
}

/** Beiträge, die mindestens ein Thema mit dem angegebenen teilen. */
export async function getRelatedArticles(
  slug: string,
  themen: { slug?: string }[] | undefined,
  limit = 3,
): Promise<ArticleSummary[]> {
  const themeSlugs = new Set((themen ?? []).map((t) => t.slug).filter(Boolean));
  if (themeSlugs.size === 0) return [];
  const articles = await getArticles();
  return articles
    .filter((a) => a.slug !== slug && a.themen?.some((t) => t.slug != null && themeSlugs.has(t.slug)))
    .slice(0, limit);
}
