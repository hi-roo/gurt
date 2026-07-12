/**
 * Themen-Radar (CAP-1): beobachtet Signale (Bundestag-DIP) und schlägt strukturierte
 * Beitrags-Ideen (`idee`-Dokumente) in Sanity vor — als REDAKTIONELLE VORSCHLÄGE,
 * nicht als veröffentlichte Inhalte (docs/07; @gurt/data-Regel „kein Auto-Publish").
 *
 * Läuft in der GitHub Action `themen-radar.yml` (Node 22) oder lokal:
 *   set -a; . ./.env.local; set +a
 *   pnpm radar:topics            # schreibt Vorschläge
 *   pnpm radar:topics -- --dry   # nur Vorschau, kein Schreiben
 *
 * Env: SANITY_WRITE_TOKEN (oder SANITY_API_READ_TOKEN), DIP_API_KEY.
 * Idempotent: `createIfNotExists` mit deterministischer _id (idee.dip.<vorgang-id>)
 * legt nur NEUE Ideen an und überschreibt nie redaktionell bearbeitete.
 */
import { fetchAllVorgaenge, type DipVorgang } from '../packages/data/src/index.ts';

const PROJECT = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'nfndwwt2';
const DATASET = process.env.SANITY_DATASET ?? 'production';
const TOKEN = process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;
const MUTATE_URL = `https://${PROJECT}.api.sanity.io/v2025-01-01/data/mutate/${DATASET}`;

const DRY = process.argv.includes('--dry');
const RECENT_DAYS = 540; // Signale aus den letzten ~1,5 Jahren gelten als „aktuell".
const MAX_PER_TOPIC = 2; // pro Stichwort die neuesten N Vorgänge.

interface Topic {
  stichwort: string;
  themenfeld: string;
  leitfrage: string;
  kandidatenQuellen: string[];
  vizIdee: string;
}

// Benchmark-Themen + angrenzende Felder. Stichwort = DIP-Titel-Filter.
const TOPICS: Topic[] = [
  { stichwort: 'Energiewende', themenfeld: 'Energiepolitik',
    leitfrage: 'Wie verändert sich Deutschlands Energiesystem — und was zeigen die echten Erzeugungs- und Verbrauchsdaten?',
    kandidatenQuellen: ['Fraunhofer ISE / Energy-Charts', 'AG Energiebilanzen', 'BNetzA / SMARD', 'Eurostat'],
    vizIdee: 'Waffle/Treemap (Mix) · Sankey (Flüsse) · Linie (Zeit)' },
  { stichwort: 'Bundeswehr', themenfeld: 'Verteidigung',
    leitfrage: 'Wie entwickeln sich Verteidigungsausgaben und -fähigkeiten — und wohin fließt das Geld?',
    kandidatenQuellen: ['NATO — Defence Expenditure', 'Bundeshaushalt (Einzelplan 14)', 'SIPRI'],
    vizIdee: 'Linie (% BIP) · Treemap (Mittelstruktur)' },
  { stichwort: 'Fachkräfteeinwanderung', themenfeld: 'Migration',
    leitfrage: 'Wie hängen Zuwanderung und Arbeitsmarkt zusammen?',
    kandidatenQuellen: ['Statistisches Bundesamt', 'BAMF', 'SVR Migration', 'Bundesagentur für Arbeit'],
    vizIdee: 'Treemap (Herkunft) · Waffle (Gründe)' },
  { stichwort: 'Wohnungsbau', themenfeld: 'Wohnen',
    leitfrage: 'Warum kommt der Wohnungsbau nicht hinterher — und was heißt das für die Mieten?',
    kandidatenQuellen: ['Destatis (Bauen)', 'BBSR', 'Deutscher Mieterbund', 'ZDB'],
    vizIdee: 'Linie (Genehmigungen/Fertigstellungen) · Treemap (Gebäudetyp)' },
  { stichwort: 'Rente', themenfeld: 'Rente',
    leitfrage: 'Wie stabil ist die Rente — und worauf wetten die Annahmen?',
    kandidatenQuellen: ['Deutsche Rentenversicherung', 'Destatis (Demografie)', 'Rentenversicherungsbericht'],
    vizIdee: 'Verhältnis-Icon-Array (Altenquotient) · Linie (Niveau/Beitrag)' },
  { stichwort: 'Klimaschutz', themenfeld: 'Klima',
    leitfrage: 'Wo steht Deutschland bei den Klimazielen — und in welchen Sektoren hakt es?',
    kandidatenQuellen: ['Umweltbundesamt', 'Expertenrat für Klimafragen', 'Eurostat'],
    vizIdee: 'Linie (Emissionen) · Treemap (Sektoren)' },
  { stichwort: 'Schuldenbremse', themenfeld: 'Finanzen',
    leitfrage: 'Wofür gibt der Bund sein Geld aus — und wie wird es finanziert?',
    kandidatenQuellen: ['Bundesfinanzministerium', 'Bundeshaushalt', 'Bundesrechnungshof'],
    vizIdee: 'Treemap/Sankey (Haushalt) · Linie (Schulden)' },
  { stichwort: 'Bürgergeld', themenfeld: 'Arbeitsmarkt',
    leitfrage: 'Wie wirken die Reformen am Arbeitsmarkt — und was zeigen die Zahlen?',
    kandidatenQuellen: ['Bundesagentur für Arbeit', 'IAB', 'Statistisches Bundesamt'],
    vizIdee: 'Linie (Zeitreihe) · Treemap (Struktur)' },
  // Erweiterung 2026-07: offene NEUE Felder jenseits der ersten acht Benchmark-Themen.
  { stichwort: 'Kernenergie', themenfeld: 'Energiepolitik',
    leitfrage: 'Was würde ein Wiedereinstieg in die Kernenergie kosten — und wie lange würde er dauern?',
    kandidatenQuellen: ['BASE (Bundesamt für die Sicherheit der nuklearen Entsorgung)', 'BMWK', 'Fraunhofer ISE', 'IEA / OECD-NEA'],
    vizIdee: 'Balken (Kosten je Technologie) · Linie (Bau- und Laufzeiten)' },
  { stichwort: 'Fracking', themenfeld: 'Energiepolitik',
    leitfrage: 'Lohnt sich heimische Gasförderung — und was wäre per Fracking realistisch förderbar?',
    kandidatenQuellen: ['BGR (Bundesanstalt für Geowissenschaften und Rohstoffe)', 'LBEG Niedersachsen', 'Umweltbundesamt', 'BMWK'],
    vizIdee: 'Linie (Fördermengen) · Treemap (Reserven und Projekte)' },
  { stichwort: 'Steuerpolitik', themenfeld: 'Finanzen',
    leitfrage: 'Wer trägt wie viel Steuerlast — und wer soll mehr zahlen?',
    kandidatenQuellen: ['Bundesfinanzministerium', 'Statistisches Bundesamt (Steuern)', 'DIW', 'ifo Institut'],
    vizIdee: 'Anteilsbalken (Last nach Einkommensgruppe) · Treemap (Steuerarten)' },
  { stichwort: 'Gesichtserkennung', themenfeld: 'Digitales',
    leitfrage: 'Wie weit darf der Staat digital überwachen — und wie zuverlässig ist die Technik?',
    kandidatenQuellen: ['Bundesbeauftragte für den Datenschutz (BfDI)', 'Europäisches Parlament', 'NIST', 'netzpolitik.org'],
    vizIdee: 'Linie (Meldungen und Trefferraten) · Position-Matrix (Akteure)' },
];

const today = new Date();
const recentCutoff = new Date(today.getTime() - RECENT_DAYS * 24 * 60 * 60 * 1000);

function isRecent(datum?: string): boolean {
  if (!datum) return true; // ohne Datum vorsichtshalber behalten
  const d = new Date(datum);
  return Number.isNaN(d.getTime()) ? true : d >= recentCutoff;
}

function dipLink(titel: string): string {
  return `https://dip.bundestag.de/suche?term=${encodeURIComponent(titel)}&f.typ=Vorgang`;
}

function buildIdee(topic: Topic, v: DipVorgang) {
  const art = v.vorgangstyp ?? v.typ ?? 'Vorgang';
  const datum = v.datum ?? 'o. D.';
  return {
    _id: `idee.dip.${v.id}`,
    _type: 'idee',
    titel: v.titel.length > 90 ? `${v.titel.slice(0, 88)}…` : v.titel,
    status: 'vorschlag',
    themenfeld: topic.themenfeld,
    leitfrage: topic.leitfrage,
    anlass: `Neuer Bundestag-Vorgang (${art}, ${datum}): „${v.titel}". Über das Stichwort „${topic.stichwort}" erkannt.`,
    quelle: { titel: `Bundestag-DIP — Vorgang ${v.id}`, url: dipLink(v.titel) },
    kandidatenQuellen: topic.kandidatenQuellen,
    vizIdee: topic.vizIdee,
    radarQuelle: 'Bundestag-DIP',
    entdecktAm: today.toISOString().slice(0, 10),
  };
}

async function main(): Promise<void> {
  if (!process.env.DIP_API_KEY) throw new Error('DIP_API_KEY fehlt — Radar braucht den DIP-Zugang.');
  if (!TOKEN && !DRY) throw new Error('SANITY_WRITE_TOKEN (oder SANITY_API_READ_TOKEN) fehlt.');

  const ideen: ReturnType<typeof buildIdee>[] = [];
  for (const topic of TOPICS) {
    try {
      const vorgaenge = await fetchAllVorgaenge({ titel: topic.stichwort }, {}, 1);
      const recent = vorgaenge
        .filter((v) => isRecent(v.datum))
        .sort((a, b) => (b.datum ?? '').localeCompare(a.datum ?? ''))
        .slice(0, MAX_PER_TOPIC);
      for (const v of recent) ideen.push(buildIdee(topic, v));
      console.log(`· ${topic.stichwort}: ${recent.length} aktuelle Vorgänge → Idee(n)`);
    } catch (error) {
      console.warn(`! ${topic.stichwort}: übersprungen (${(error as Error).message})`);
    }
  }

  // Doppelte _ids (ein Vorgang über mehrere Stichwörter) zusammenführen.
  const byId = new Map(ideen.map((i) => [i._id, i]));
  const unique = [...byId.values()];
  console.log(`\n${unique.length} Ideen-Vorschläge gesammelt (${TOPICS.length} Themenfelder).`);

  if (DRY) {
    for (const i of unique) console.log(`  [${i.themenfeld}] ${i.titel}`);
    console.log('\n(Dry-Run — nichts geschrieben.)');
    return;
  }

  // createIfNotExists: legt nur neue Ideen an, überschreibt nie bearbeitete.
  const mutations = unique.map((doc) => ({ createIfNotExists: doc }));
  const res = await fetch(MUTATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) throw new Error(`Sanity-Mutation fehlgeschlagen: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { results?: unknown[] };
  console.log(`OK an Sanity gesendet (${json.results?.length ?? 0} Operationen; bestehende Ideen bleiben unangetastet).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
