import { getJson } from '../lib/http';
import { parseDipResponse, type DipResponse } from '../schemas/dip';

const BASE_URL = 'https://search.dip.bundestag.de/api/v1';

export interface DipClientOptions {
  /** API-Key; default aus process.env.DIP_API_KEY (siehe docs/04). */
  apiKey?: string;
}

export interface VorgangQuery {
  /** Volltext im Titel. */
  titel?: string;
  /** Sachgebiet-Filter. */
  sachgebiet?: string;
  /** Pagination-Cursor. */
  cursor?: string;
}

function resolveKey(options: DipClientOptions): string {
  const apiKey = options.apiKey ?? process.env.DIP_API_KEY;
  if (!apiKey) {
    throw new Error(
      'DIP_API_KEY fehlt. Key anfordern (parlamentsdokumentation@bundestag.de) und in .env.local setzen — siehe docs/04-data-sources.md.',
    );
  }
  return apiKey;
}

/**
 * Lädt Vorgänge (Gesetzgebungs-/Beratungsvorgänge) aus dem DIP.
 * Auth via Header `Authorization: ApiKey <key>`.
 */
export async function fetchVorgaenge(
  query: VorgangQuery = {},
  options: DipClientOptions = {},
): Promise<DipResponse> {
  const apiKey = resolveKey(options);
  const json = await getJson(`${BASE_URL}/vorgang`, {
    headers: { Authorization: `ApiKey ${apiKey}` },
    query: {
      'f.titel': query.titel,
      'f.sachgebiet': query.sachgebiet,
      cursor: query.cursor,
    },
  });
  return parseDipResponse(json);
}

/** Lädt Drucksachen (Dokumente) aus dem DIP. */
export async function fetchDrucksachen(
  query: { titel?: string; cursor?: string } = {},
  options: DipClientOptions = {},
): Promise<DipResponse> {
  const apiKey = resolveKey(options);
  const json = await getJson(`${BASE_URL}/drucksache`, {
    headers: { Authorization: `ApiKey ${apiKey}` },
    query: { 'f.titel': query.titel, cursor: query.cursor },
  });
  return parseDipResponse(json);
}
