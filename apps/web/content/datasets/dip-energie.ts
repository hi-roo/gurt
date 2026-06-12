import raw from './dip-energie.json';
import type { ResolvedVisualisierung } from '../types';

/**
 * DIP-Datensatz (Deutscher Bundestag). Befüllt via (DIP_API_KEY erforderlich):
 *
 *   DIP_API_KEY=<key> pnpm --silent --filter @gurt/data ingest -- \
 *     --source=bundestag-dip --titel=Energie --pages=20 \
 *     > apps/web/content/datasets/dip-energie.json
 *
 * Solange `daten` leer ist, wird der DIP-Beitrag NICHT gerendert (siehe seed.ts).
 */
interface RawDatensatz {
  titel: string;
  provenance: {
    herausgeber?: string;
    url?: string;
    abgerufenAm?: string;
    lizenz?: string;
    hinweis?: string;
  };
  spalten: { name: string; typ: string; einheit?: string }[];
  daten: Array<Record<string, string | number | null>>;
}

const ds = raw as RawDatensatz;

export const hasDipData = ds.daten.length > 0;

const stand = ds.provenance.abgerufenAm ? ds.provenance.abgerufenAm.slice(0, 10) : 'n/a';
const jahre = ds.daten.map((d) => String(d.jahr));
const von = jahre.at(0) ?? '';
const bis = jahre.at(-1) ?? '';
const gesamt = ds.daten.reduce((sum, d) => sum + (typeof d.anzahl === 'number' ? d.anzahl : 0), 0);

const TITEL = 'Energie im Bundestag — Vorgänge je Jahr';

export const dipEnergieVisualisierung: ResolvedVisualisierung = {
  titel: TITEL,
  typ: 'linie',
  beschreibung: hasDipData
    ? `Liniendiagramm der im DIP erfassten Bundestags-Vorgänge mit dem Titelstichwort „Energie“ je Jahr (${von}–${bis}, insgesamt ${gesamt}). Von wenigen Vorgängen in den 1970er-Jahren steigt die parlamentarische Befassung auf ein hohes Niveau in den 2010er- und 2020er-Jahren; das laufende Jahr ${bis} ist noch unvollständig. Quelle: Deutscher Bundestag, DIP; Stand ${stand}.`
    : 'Noch keine DIP-Daten erfasst.',
  caption: `Bundestags-Vorgänge mit Titel „Energie“ je Jahr, ${von}–${bis} (Quelle: DIP; Stand ${stand}).`,
  encoding: { xFeld: 'jahr', yFeld: 'anzahl' },
  datensatz: {
    titel: TITEL,
    quelle: {
      titel: ds.provenance.herausgeber ?? 'Deutscher Bundestag (DIP)',
      url: ds.provenance.url,
      herausgeber: ds.provenance.herausgeber,
    },
    spalten: ds.spalten,
    daten: ds.daten,
  },
};
