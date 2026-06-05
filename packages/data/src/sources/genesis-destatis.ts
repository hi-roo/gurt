import { z } from 'zod';
import { postForm } from '../lib/http';

/**
 * Adapter für GENESIS-Online (Statistisches Bundesamt / Destatis) — die amtliche
 * Statistik-Primärquelle. Tabellen werden über das REST-Webservice geholt.
 *
 * Auth: persönlicher **API-Token** im HTTP-Header `username` (Passwort bleibt leer).
 * Das neue GENESIS (genesis.destatis.de) erwartet die Daten-Methoden als **POST**
 * mit formularkodiertem Body. Token niemals committen — aus `GENESIS_API_TOKEN`.
 *
 * Lizenz der Daten: „Datenlizenz Deutschland — Namensnennung 2.0" (dl-de/by-2-0).
 * Siehe docs/04-data-sources.md.
 */
const BASE = 'https://genesis.destatis.de/genesisWS/rest/2020';
const USER_AGENT = 'GURT-DataBot/1.0 (+https://gurt.info; nicht-kommerzieller Datenjournalismus)';

export interface GenesisOptions {
  /** API-Token; Default aus `process.env.GENESIS_API_TOKEN`. */
  token?: string;
}

export interface TableQuery {
  /** Statistik-/Tabellencode, z. B. „12411-0001". */
  name: string;
  /** Regionale Tiefe (Default „all"). */
  area?: string;
  /** Ab Jahr (vierstellig). */
  startyear?: string;
  /** Bis Jahr (vierstellig). */
  endyear?: string;
  /** Antwortsprache (Default „de"). */
  language?: 'de' | 'en';
}

const statusSchema = z.object({
  Code: z.number(),
  Content: z.string(),
  Type: z.string().optional(),
});

const tableResponseSchema = z.object({
  Ident: z.object({ Service: z.string(), Method: z.string() }).optional(),
  Status: statusSchema,
  Parameter: z.record(z.unknown()).optional(),
  Object: z
    .object({
      Content: z.string(),
      Structure: z.unknown().optional(),
      TableLayout: z.unknown().optional(),
    })
    .optional(),
  Copyright: z.string().optional(),
});
export type GenesisTableResponse = z.infer<typeof tableResponseSchema>;

function resolveToken(options: GenesisOptions): string {
  const token = options.token ?? process.env.GENESIS_API_TOKEN;
  if (!token) {
    throw new Error(
      'GENESIS_API_TOKEN fehlt. Token unter https://www-genesis.destatis.de → „Webservice (API)" erzeugen und in .env.local setzen — siehe docs/04-data-sources.md.',
    );
  }
  return token;
}

/**
 * Holt eine Tabelle aus GENESIS-Online über `data/table` (POST, Token im Header
 * `username`). Wirft bei `Status.Code != 0` mit der GENESIS-Meldung. Die Antwort
 * wird mit Zod validiert; die Tabelle steckt in `Object.Content`.
 */
export async function fetchTable(
  query: TableQuery,
  options: GenesisOptions = {},
): Promise<GenesisTableResponse> {
  const token = resolveToken(options);
  const json = await postForm(`${BASE}/data/table`, {
    headers: { username: token, 'user-agent': USER_AGENT },
    form: {
      name: query.name,
      area: query.area ?? 'all',
      compress: 'false',
      transpose: 'false',
      language: query.language ?? 'de',
      startyear: query.startyear,
      endyear: query.endyear,
    },
  });
  const parsed = tableResponseSchema.parse(json);
  if (parsed.Status.Code !== 0) {
    throw new Error(`GENESIS-Fehler (${parsed.Status.Code}): ${parsed.Status.Content}`);
  }
  return parsed;
}

/** Eine Zeitreihen-Zeile. Type-Alias (nicht interface), damit zuweisbar an
 *  `Record<string, unknown>` für `toDatensatz`. */
export type GenesisRow = {
  /** Zeilenbeschriftung (i. d. R. Zeitpunkt/Jahr). */
  label: string;
  /** Numerischer Wert der letzten Spalte. */
  wert: number;
};

/** Deutsche Zahl („1.234,5") → number; null wenn nicht numerisch („…", „-", leer). */
export function parseGermanNumber(raw: string): number | null {
  const cleaned = raw.replace(/\./g, '').replace(',', '.').trim();
  if (cleaned === '' || cleaned === '-' || cleaned === '...') return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/**
 * Parser für einfache Zeitreihen aus `Object.Content` (semikolon-getrennte
 * Tabellen-Darstellung): nimmt je Zeile die erste Spalte als Label und die
 * letzte numerische Spalte als Wert. Titel-/Kopfzeilen ohne numerischen Wert
 * werden übersprungen. Pure → testbar. Für komplexe mehrdimensionale Tabellen
 * empfiehlt sich stattdessen das Flat-File-CSV (`data/tablefile`, ffcsv).
 */
export function parseFlatTimeSeries(content: string): GenesisRow[] {
  const rows: GenesisRow[] = [];
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.includes(';')) continue;
    const parts = trimmed.split(';');
    if (parts.length < 2) continue;
    const label = (parts[0] ?? '').trim();
    if (!label) continue;
    const wert = parseGermanNumber(parts[parts.length - 1] ?? '');
    if (wert == null) continue;
    rows.push({ label, wert });
  }
  return rows;
}

/** Bequemlichkeit: Tabelle holen und als einfache Zeitreihe parsen. */
export async function fetchTimeSeries(
  query: TableQuery,
  options: GenesisOptions = {},
): Promise<GenesisRow[]> {
  const res = await fetchTable(query, options);
  return parseFlatTimeSeries(res.Object?.Content ?? '');
}
