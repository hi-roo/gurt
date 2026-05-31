import raw from './dip-energie.json';
import type { ResolvedVisualisierung } from '../types';

/**
 * DIP-Datensatz (Deutscher Bundestag). Wird mit EINEM Befehl befüllt, sobald ein
 * DIP_API_KEY in .env.local steht — danach erscheint der Beitrag automatisch:
 *
 *   pnpm --filter @gurt/data ingest -- --source=bundestag-dip --titel=Energie \
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

export const dipEnergieVisualisierung: ResolvedVisualisierung = {
  titel: ds.titel,
  typ: 'linie',
  beschreibung: hasDipData
    ? `Liniendiagramm: Anzahl der Bundestags-Vorgänge zum Thema Energie je Jahr (Quelle: Deutscher Bundestag, DIP; Stand ${stand}).`
    : 'Noch keine DIP-Daten erfasst.',
  caption: `Bundestags-Vorgänge je Jahr (Quelle: DIP; Stand ${stand}).`,
  encoding: { xFeld: 'jahr', yFeld: 'anzahl' },
  datensatz: {
    titel: ds.titel,
    quelle: {
      titel: ds.provenance.herausgeber ?? 'Deutscher Bundestag (DIP)',
      url: ds.provenance.url,
      herausgeber: ds.provenance.herausgeber,
    },
    spalten: ds.spalten,
    daten: ds.daten,
  },
};
