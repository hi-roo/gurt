// @gurt/data — getypte Adapter & ETL für offizielle Quellen.
// Validierung an der Grenze mit Zod. Siehe docs/04 & docs/05.
export type { Datensatz, Provenance, Spalte } from './types';
export { getJson, getText } from './lib/http';

export { fetchVorgaenge, fetchAllVorgaenge, fetchDrucksachen } from './sources/bundestag-dip';
export type { VorgangQuery, DipClientOptions } from './sources/bundestag-dip';
export { parseDipResponse } from './schemas/dip';
export type { DipResponse, DipVorgang } from './schemas/dip';

export {
  sparql,
  bindingsToRows,
  searchDatasets,
  searchDatasetsByTitle,
  countDatasets,
  countDatasetsByKeywords,
  searchDatasetsSample,
} from './sources/data-europa';
export type { SparqlResults, SparqlValue, EuDatasetRecord } from './sources/data-europa';
export { aggregateByCountry } from './transform/eu-datasets';

export { parseRssItems, fetchFeed } from './sources/bundesregierung';
export type { FeedItem } from './sources/bundesregierung';

export {
  fetchAnnualGeneration,
  aggregateGeneration,
  erneuerbarenAnteil,
} from './sources/energy-charts';
export type { GenerationByType, PublicPowerResponse } from './sources/energy-charts';

export { toDatensatz, inferSpalten } from './transform/dataset';
export type { ToDatensatzInput } from './transform/dataset';
export { vorgaengeNachJahr, vorgaengeNachTyp } from './transform/vorgaenge';
