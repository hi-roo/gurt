import { z } from 'zod';
import { getJson } from '../lib/http';

/**
 * Adapter für data.europa.eu (EU-Open-Data-Portal).
 * Primär: SPARQL-Endpoint (stabil, dokumentiert). Zusätzlich: Such-API.
 * Siehe docs/04-data-sources.md.
 */

const SPARQL_ENDPOINT = 'https://data.europa.eu/sparql';
const SEARCH_BASE = 'https://data.europa.eu/api/hub/search';

export interface SparqlValue {
  type: string;
  value: string;
  datatype?: string;
  'xml:lang'?: string;
}

export interface SparqlResults {
  head: { vars: string[] };
  results: { bindings: Array<Record<string, SparqlValue>> };
}

/** Führt eine SPARQL-Abfrage aus und liefert JSON-Ergebnisse. */
export async function sparql(query: string): Promise<SparqlResults> {
  return getJson<SparqlResults>(SPARQL_ENDPOINT, {
    query: { query, format: 'application/sparql-results+json' },
    headers: { accept: 'application/sparql-results+json' },
  });
}

/** Wandelt SPARQL-Bindings in flache Objekt-Zeilen (nur die `value`-Felder). */
export function bindingsToRows(results: SparqlResults): Array<Record<string, string>> {
  return results.results.bindings.map((binding) =>
    Object.fromEntries(Object.entries(binding).map(([key, cell]) => [key, cell.value])),
  );
}

/**
 * Volltextsuche über die Such-API. Endpoint-Pfad ggf. an die jeweilige
 * Portal-Version anpassen (siehe Developers' Corner).
 */
export async function searchDatasets(q: string, limit = 10): Promise<unknown> {
  return getJson(`${SEARCH_BASE}/search`, { query: { q, limit } });
}

const searchCountSchema = z.object({
  result: z.object({ count: z.number() }).passthrough(),
});

/**
 * Liefert die Gesamtzahl offener Datensätze zu einem Stichwort über die
 * Such-API (KEIN Key nötig, schnell, server-seitig aggregiert). Live lauffähig.
 */
export async function countDatasets(keyword: string): Promise<number> {
  const json = await getJson(`${SEARCH_BASE}/search`, { query: { q: keyword, limit: 0 } });
  return searchCountSchema.parse(json).result.count;
}

const euSampleSchema = z.object({
  result: z.object({
    results: z.array(
      z
        .object({
          country: z.object({ label: z.string() }).partial().nullable().optional(),
          issued: z.string().nullable().optional(),
        })
        .passthrough(),
    ),
  }),
});

export interface EuDatasetRecord {
  land: string;
  jahr: string | null;
}

/**
 * Holt eine Stichprobe der relevantesten Datensätze zu einem Stichwort und
 * extrahiert Herkunftsland + Erscheinungsjahr (kein Key nötig, live lauffähig).
 * Hinweis: relevanz-sortiert — als Stichprobe ausweisen, nicht als Vollerhebung.
 */
export async function searchDatasetsSample(
  keyword: string,
  limit = 100,
): Promise<EuDatasetRecord[]> {
  const json = await getJson(`${SEARCH_BASE}/search`, { query: { q: keyword, limit } });
  const parsed = euSampleSchema.parse(json);
  return parsed.result.results.map((entry) => ({
    land: entry.country?.label ?? 'Unbekannt',
    jahr: entry.issued ? entry.issued.slice(0, 4) : null,
  }));
}

/** Holt Treffer-Zahlen für mehrere Stichwörter (sequenziell, fair zum Portal). */
export async function countDatasetsByKeywords(
  keywords: string[],
): Promise<Array<{ stichwort: string; anzahl: number }>> {
  const rows: Array<{ stichwort: string; anzahl: number }> = [];
  for (const stichwort of keywords) {
    rows.push({ stichwort, anzahl: await countDatasets(stichwort) });
  }
  return rows;
}

/** Escapt einen Wert für die Einbettung in ein SPARQL-Stringliteral. */
function sparqlString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Sucht deutschsprachige Datensätze, deren Titel das Stichwort enthält.
 * Nutzt den stabilen SPARQL-Endpoint (KEIN API-Key nötig) — live lauffähig.
 */
export async function searchDatasetsByTitle(
  keyword: string,
  limit = 10,
): Promise<Array<{ dataset: string; title: string }>> {
  const query = `
    SELECT ?dataset ?title WHERE {
      ?dataset a <http://www.w3.org/ns/dcat#Dataset> ;
               <http://purl.org/dc/terms/title> ?title .
      FILTER(LANG(?title) = "de" && CONTAINS(LCASE(STR(?title)), LCASE("${sparqlString(keyword)}")))
    } LIMIT ${Math.max(1, Math.min(limit, 100))}`;
  const results = await sparql(query);
  return bindingsToRows(results).map((row) => ({
    dataset: row.dataset ?? '',
    title: row.title ?? '',
  }));
}
