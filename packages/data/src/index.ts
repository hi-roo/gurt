// @gurt/data — getypte Adapter & ETL für offizielle Quellen.
// Validierung an der Grenze mit Zod. Siehe docs/04 & docs/05.
export type { Datensatz, Provenance, Spalte } from './types';
export { getJson, getText } from './lib/http';

export { fetchVorgaenge, fetchAllVorgaenge, fetchDrucksachen } from './sources/bundestag-dip';
export type { VorgangQuery, DipClientOptions } from './sources/bundestag-dip';
export { parseDipResponse } from './schemas/dip';
export type { DipResponse, DipVorgang } from './schemas/dip';

export { sparql, bindingsToRows, searchDatasets, searchDatasetsByTitle } from './sources/data-europa';
export type { SparqlResults, SparqlValue } from './sources/data-europa';

export { parseRssItems, fetchFeed } from './sources/bundesregierung';
export type { FeedItem } from './sources/bundesregierung';

export { toDatensatz, inferSpalten } from './transform/dataset';
export type { ToDatensatzInput } from './transform/dataset';
export { vorgaengeNachJahr, vorgaengeNachTyp } from './transform/vorgaenge';
