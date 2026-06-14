/**
 * Aktualisiert die live-basierten Sanity-Datensätze (datenJson) mit frischen Zahlen.
 * Frontend zieht via ISR (revalidate 60s) automatisch nach — kein Redeploy nötig.
 *
 * Läuft in der GitHub Action `refresh-data.yml` (Node 22) oder lokal: `pnpm refresh:data`.
 * Env: SANITY_WRITE_TOKEN (Pflicht), DIP_API_KEY (optional, sonst DIP übersprungen).
 *
 * Verwaltet: EU-Datensätze, Bundestag-DIP-Vorgänge und der Chord der laufenden
 * 21. Wahlperiode (namentliche Abstimmungen). Diese _ids werden vom Seed-Import
 * NICHT überschrieben (siehe REFRESH_MANAGED in scripts/import-to-sanity.mjs).
 *
 * Schützt vor Datenverlust: leere Ergebnisse werden NICHT geschrieben.
 */
import {
  countDatasetsByKeywords,
  searchDatasetsSample,
  aggregateByCountry,
  fetchAllVorgaenge,
  vorgaengeNachJahr,
  fetchAllPollsWithVotes,
  presentFraktionen,
  fraktionsMatrix,
  CHORD_SPALTEN,
  type Provenance,
} from '../packages/data/src/index.ts';

const PROJECT = 'nfndwwt2';
const DATASET = 'production';
const MUTATE_URL = `https://${PROJECT}.api.sanity.io/v2025-01-01/data/mutate/${DATASET}`;

// Englische Ländernamen der EU-Such-API → Deutsch (Fallback: Originalname).
const LAND_DE: Record<string, string> = {
  Germany: 'Deutschland', Denmark: 'Dänemark', France: 'Frankreich', Austria: 'Österreich',
  Ireland: 'Irland', Netherlands: 'Niederlande', Belgium: 'Belgien', Switzerland: 'Schweiz',
  Croatia: 'Kroatien', Lithuania: 'Litauen', Spain: 'Spanien', Italy: 'Italien', Poland: 'Polen',
  Sweden: 'Schweden', Finland: 'Finnland', Norway: 'Norwegen', Portugal: 'Portugal',
  Greece: 'Griechenland', Czechia: 'Tschechien', Slovenia: 'Slowenien', Slovakia: 'Slowakei',
  Hungary: 'Ungarn', Romania: 'Rumänien', Bulgaria: 'Bulgarien', Estonia: 'Estland',
  Latvia: 'Lettland', Luxembourg: 'Luxemburg', Cyprus: 'Zypern', Malta: 'Malta', Iceland: 'Island',
  'United Kingdom': 'Vereinigtes Königreich',
};

async function patchDatenJson(
  token: string,
  id: string,
  daten: unknown[],
  extraSet: Record<string, unknown> = {},
): Promise<void> {
  if (!Array.isArray(daten) || daten.length === 0) {
    throw new Error(`leeres Ergebnis — nicht geschrieben (Schutz vor Datenverlust)`);
  }
  const set = { datenJson: JSON.stringify(daten), ...extraSet };
  const res = await fetch(MUTATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations: [{ patch: { id, set } }] }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
  console.log(`✓ ${id}: ${daten.length} Zeilen aktualisiert`);
}

let hadError = false;
async function step(label: string, run: () => Promise<void>): Promise<void> {
  try {
    await run();
  } catch (error) {
    hadError = true;
    console.error(`✗ ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function main(): Promise<void> {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error('SANITY_WRITE_TOKEN fehlt.');

  await step('EU-Datensätze nach Stichwort', async () => {
    const keywords = [
      'Energie', 'Erneuerbare Energien', 'Windenergie', 'Solarenergie',
      'Wasserkraft', 'Erdgas', 'Kohle', 'Energieeffizienz',
    ];
    const rows = await countDatasetsByKeywords(keywords);
    await patchDatenJson(token, 'datensatz.eu-energie-datensaetze.0', rows);
  });

  await step('EU-Datensätze nach Herkunftsland', async () => {
    const sample = await searchDatasetsSample('Energie', 300);
    const rows = aggregateByCountry(sample, 10).map((r) => ({
      land: LAND_DE[r.land] ?? r.land,
      anzahl: r.anzahl,
    }));
    await patchDatenJson(token, 'datensatz.eu-energie-datensaetze.1', rows);
  });

  if (process.env.DIP_API_KEY) {
    await step('Bundestag-DIP Vorgänge nach Jahr', async () => {
      const provenance: Provenance = {
        herausgeber: 'Deutscher Bundestag',
        url: 'https://search.dip.bundestag.de/api/v1/vorgang',
        abgerufenAm: new Date().toISOString(),
        lizenz: 'amtliches Werk (DIP-Nutzungshinweise)',
      };
      const vorgaenge = await fetchAllVorgaenge({ titel: 'Energie' }, {}, 20);
      const datensatz = vorgaengeNachJahr(vorgaenge, provenance);
      await patchDatenJson(token, 'datensatz.dip-energie-vorgaenge.0', datensatz.daten);
    });
  } else {
    console.log('· DIP_API_KEY nicht gesetzt → DIP übersprungen');
  }

  // Chord „Wer stimmt mit wem?" — laufende 21. WP (keyless, CC0). Die abgeschlossene
  // 20. WP (.0) bleibt statisch im Seed; nur die laufende Periode (.1) wird aufgefrischt.
  await step('Bundestag namentliche Abstimmungen (21. WP)', async () => {
    const polls = await fetchAllPollsWithVotes(161, { delayMs: 1200 });
    const fraktionen = presentFraktionen(polls);
    const result = fraktionsMatrix(polls, fraktionen);
    const rows = result.paare.map((pair) => ({
      fraktionA: pair.fraktionA,
      fraktionB: pair.fraktionB,
      uebereinstimmung: pair.uebereinstimmung,
    }));
    await patchDatenJson(token, 'datensatz.wer-stimmt-mit-wem.1', rows, {
      titel: `Fraktions-Übereinstimmung im Bundestag (21. WP, ${result.abstimmungen} namentliche Abstimmungen)`,
      spalten: CHORD_SPALTEN,
    });
  });

  console.log('Fertig. Frontend zieht via ISR (revalidate 60s) automatisch nach.');
  if (hadError) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
