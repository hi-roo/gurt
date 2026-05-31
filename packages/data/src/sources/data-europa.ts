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
