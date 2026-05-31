import type { PortableTextBlock } from '@portabletext/types';
import type { Haltung } from '@gurt/visualizations';

export interface QuelleRef {
  titel: string;
  url?: string;
  herausgeber?: string;
}

export interface ResolvedDatensatz {
  titel: string;
  spalten: { name: string; typ: string; einheit?: string }[];
  /** Datenzeilen (im Seed direkt, aus Sanity nach JSON-Parse von datenJson). */
  daten: Array<Record<string, string | number | null>>;
  quelle?: QuelleRef;
}

export interface ResolvedVisualisierung {
  titel: string;
  typ: 'balken' | 'linie' | 'flaeche' | 'position-matrix' | 'zeitachse' | 'bespoke';
  /** A11y-Pflichtfeld: Text-Alternative. */
  beschreibung: string;
  caption?: string;
  encoding?: { xFeld?: string; yFeld?: string; kategorieFeld?: string; serieFeld?: string };
  datensatz?: ResolvedDatensatz;
  /** Nur für position-matrix. */
  positionen?: { akteur: string; massnahme: string; haltung: Haltung; zitat?: string }[];
}

export interface VisualisierungBlock {
  _type: 'visualisierungBlock';
  _key: string;
  visualisierung: ResolvedVisualisierung;
}

export interface DatentabelleBlock {
  _type: 'datentabelleBlock';
  _key: string;
  caption?: string;
  datensatz: ResolvedDatensatz;
}

export interface ZitatBlock {
  _type: 'zitatBlock';
  _key: string;
  zitat: string;
  quelle?: QuelleRef;
}

export interface QuellenNote {
  _type: 'quellenNote';
  _key: string;
  text: string;
  quelle?: QuelleRef;
}

export interface VergleichBlock {
  _type: 'vergleichBlock';
  _key: string;
  titel?: string;
  einleitung?: string;
  links?: { titel: string };
  rechts?: { titel: string };
}

export type BodyBlock =
  | PortableTextBlock
  | VisualisierungBlock
  | DatentabelleBlock
  | ZitatBlock
  | QuellenNote
  | VergleichBlock;

export interface ArticleSummary {
  _id: string;
  titel: string;
  slug: string;
  standfirst?: string;
  veroeffentlicht?: string;
  themen?: { name: string; slug?: string }[];
}

export interface Article extends ArticleSummary {
  methodik?: string;
  autoren?: { name: string; rolle?: string }[];
  body: BodyBlock[];
}
