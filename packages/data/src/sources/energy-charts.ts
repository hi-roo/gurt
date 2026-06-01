import { z } from 'zod';
import { getJson } from '../lib/http';

/**
 * Adapter für die Energy-Charts-API (Fraunhofer ISE) — offen, kein Key.
 * Liefert die öffentliche Stromerzeugung; hier aggregiert zu Jahres-TWh je Träger.
 * Siehe docs/04-data-sources.md.
 */
const BASE = 'https://api.energy-charts.info';

const publicPowerSchema = z.object({
  unix_seconds: z.array(z.number()),
  production_types: z.array(
    z.object({ name: z.string(), data: z.array(z.number().nullable()) }),
  ),
});
export type PublicPowerResponse = z.infer<typeof publicPowerSchema>;

export interface GenerationByType {
  traeger: string;
  twh: number;
}

/**
 * API-Produktionstyp → deutsche Träger-Kategorie. Nicht gelistete Typen werden
 * bewusst ausgeschlossen: Pumpspeicher (Speicher, keine Primärerzeugung), Cross-
 * Border, Load/Residual load, Renewable-share-Reihen.
 */
const TRAEGER: Record<string, string> = {
  'Wind onshore': 'Windkraft',
  'Wind offshore': 'Windkraft',
  Solar: 'Solar',
  Biomass: 'Biomasse',
  'Hydro Run-of-River': 'Wasserkraft',
  'Hydro water reservoir': 'Wasserkraft',
  'Fossil brown coal / lignite': 'Braunkohle',
  'Fossil hard coal': 'Steinkohle',
  'Fossil gas': 'Erdgas',
  'Fossil oil': 'Sonstige',
  'Fossil coal-derived gas': 'Sonstige',
  Waste: 'Sonstige',
  Geothermal: 'Sonstige',
  Others: 'Sonstige',
};

const ERNEUERBAR = new Set(['Windkraft', 'Solar', 'Biomasse', 'Wasserkraft']);

/** Reine Aggregation (testbar): Zeitreihe (MW) → TWh je Träger-Kategorie. */
export function aggregateGeneration(response: PublicPowerResponse): GenerationByType[] {
  const seconds = response.unix_seconds;
  const first = seconds[0];
  const second = seconds[1];
  if (first == null || second == null) return [];
  const intervalHours = (second - first) / 3600;

  const byTraeger = new Map<string, number>();
  for (const type of response.production_types) {
    const traeger = TRAEGER[type.name];
    if (!traeger) continue;
    const summe = type.data.reduce<number>((acc, value) => acc + (value ?? 0), 0);
    const twh = (summe * intervalHours) / 1_000_000;
    byTraeger.set(traeger, (byTraeger.get(traeger) ?? 0) + twh);
  }

  return [...byTraeger.entries()]
    .map(([traeger, twh]) => ({ traeger, twh: Math.round(twh * 10) / 10 }))
    .sort((a, b) => b.twh - a.twh);
}

/** Anteil erneuerbarer Träger an der Summe (in %, 1 Nachkommastelle). */
export function erneuerbarenAnteil(rows: GenerationByType[]): number {
  const total = rows.reduce((acc, r) => acc + r.twh, 0);
  if (total === 0) return 0;
  const ee = rows.filter((r) => ERNEUERBAR.has(r.traeger)).reduce((acc, r) => acc + r.twh, 0);
  return Math.round((ee / total) * 1000) / 10;
}

/** Jahres-Stromerzeugung nach Energieträger (TWh) aus der Energy-Charts-API. */
export async function fetchAnnualGeneration(country: string, year: number): Promise<GenerationByType[]> {
  const json = await getJson(`${BASE}/public_power`, {
    query: { country, start: `${year}-01-01`, end: `${year}-12-31` },
  });
  return aggregateGeneration(publicPowerSchema.parse(json));
}
