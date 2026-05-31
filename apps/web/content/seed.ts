import type { PortableTextBlock } from '@portabletext/types';
import type { Article, BodyBlock } from './types';

/**
 * Seed-Inhalt: das Energie-Leitbeispiel. Läuft, bevor ein Sanity-Projekt existiert.
 *
 * WICHTIG: Alle Zahlen sind ILLUSTRATIV und dienen nur der Demonstration der
 * Darstellungsformen. Keine erfundenen Zitate realer Personen (siehe docs/07).
 * Echte Beiträge werden redaktionell aus offiziellen Quellen erstellt.
 */

let counter = 0;
const key = (): string => `seed-${counter++}`;

function block(style: PortableTextBlock['style'], text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  };
}

const positionsMatrix: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wer steht wie zu den drei Wegen?',
    typ: 'position-matrix',
    beschreibung:
      'Matrix aus fünf Akteuren und drei energiepolitischen Maßnahmen. Sie zeigt, dass Zustimmung zu neuen Gaskraftwerken, zum Ausbau der Erneuerbaren und zur Technologieoffenheit nebeneinander bestehen können — mehrere Positionen sind gleichzeitig vertretbar.',
    caption: 'Positionen ausgewählter Akteure zu drei parallelen Maßnahmen (illustratives Beispiel).',
    positionen: [
      { akteur: 'Wirtschaftsministerium', massnahme: 'Neue Gaskraftwerke', haltung: 'dafuer', zitat: 'Gaskraftwerke als Brücke für Versorgungssicherheit (illustrativ).' },
      { akteur: 'Wirtschaftsministerium', massnahme: 'Ausbau Erneuerbare', haltung: 'differenziert' },
      { akteur: 'Wirtschaftsministerium', massnahme: 'Technologieoffenheit', haltung: 'dafuer', zitat: 'Lösungen technologieoffen denken (illustrativ).' },
      { akteur: 'Umweltverbände', massnahme: 'Neue Gaskraftwerke', haltung: 'dagegen' },
      { akteur: 'Umweltverbände', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer' },
      { akteur: 'Umweltverbände', massnahme: 'Technologieoffenheit', haltung: 'differenziert' },
      { akteur: 'Industrieverband', massnahme: 'Neue Gaskraftwerke', haltung: 'dafuer' },
      { akteur: 'Industrieverband', massnahme: 'Ausbau Erneuerbare', haltung: 'differenziert' },
      { akteur: 'Industrieverband', massnahme: 'Technologieoffenheit', haltung: 'dafuer' },
      { akteur: 'Energiewirtschaft', massnahme: 'Neue Gaskraftwerke', haltung: 'dafuer' },
      { akteur: 'Energiewirtschaft', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer' },
      { akteur: 'Energiewirtschaft', massnahme: 'Technologieoffenheit', haltung: 'differenziert' },
      { akteur: 'Klimaforschung', massnahme: 'Neue Gaskraftwerke', haltung: 'differenziert' },
      { akteur: 'Klimaforschung', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer' },
      { akteur: 'Klimaforschung', massnahme: 'Technologieoffenheit', haltung: 'unklar' },
    ],
  },
};

const erzeugungBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Stromerzeugung nach Energieträger',
    typ: 'balken',
    beschreibung:
      'Balkendiagramm der Stromerzeugung nach Energieträger in Terawattstunden. Erneuerbare liefern den größten Anteil, Erdgas einen kleineren, aber für die Spitzenlast relevanten Beitrag (illustrative Werte).',
    caption: 'Stromerzeugung nach Energieträger in TWh (illustratives Beispiel).',
    encoding: { kategorieFeld: 'traeger', yFeld: 'twh' },
    datensatz: {
      titel: 'Stromerzeugung nach Energieträger',
      quelle: { titel: 'Illustratives Beispiel', herausgeber: 'Gurt (Demo-Daten)' },
      spalten: [
        { name: 'traeger', typ: 'string' },
        { name: 'twh', typ: 'number', einheit: 'TWh' },
      ],
      daten: [
        { traeger: 'Erneuerbare', twh: 256 },
        { traeger: 'Kohle', twh: 132 },
        { traeger: 'Erdgas', twh: 76 },
        { traeger: 'Sonstige', twh: 40 },
      ],
    },
  },
};

const investitionenLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Investitionen: Erneuerbare und Gaskraftwerke',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm zweier Investitionsverläufe 2019–2025 in Milliarden Euro. Investitionen in Erneuerbare steigen zunächst und gehen zuletzt leicht zurück; Investitionen in Gaskraftwerke steigen kontinuierlich (illustrative Werte).',
    caption: 'Jährliche Investitionen in Mrd. € (illustratives Beispiel).',
    encoding: { xFeld: 'jahr', yFeld: 'mrd', serieFeld: 'bereich' },
    datensatz: {
      titel: 'Investitionen nach Bereich, 2019–2025',
      quelle: { titel: 'Illustratives Beispiel', herausgeber: 'Gurt (Demo-Daten)' },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'bereich', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd. €' },
      ],
      daten: [
        { jahr: '2019', bereich: 'Erneuerbare', mrd: 12 },
        { jahr: '2020', bereich: 'Erneuerbare', mrd: 14 },
        { jahr: '2021', bereich: 'Erneuerbare', mrd: 16 },
        { jahr: '2022', bereich: 'Erneuerbare', mrd: 19 },
        { jahr: '2023', bereich: 'Erneuerbare', mrd: 22 },
        { jahr: '2024', bereich: 'Erneuerbare', mrd: 20 },
        { jahr: '2025', bereich: 'Erneuerbare', mrd: 18 },
        { jahr: '2019', bereich: 'Gaskraftwerke', mrd: 2 },
        { jahr: '2020', bereich: 'Gaskraftwerke', mrd: 2 },
        { jahr: '2021', bereich: 'Gaskraftwerke', mrd: 3 },
        { jahr: '2022', bereich: 'Gaskraftwerke', mrd: 4 },
        { jahr: '2023', bereich: 'Gaskraftwerke', mrd: 5 },
        { jahr: '2024', bereich: 'Gaskraftwerke', mrd: 7 },
        { jahr: '2025', bereich: 'Gaskraftwerke', mrd: 9 },
      ],
    },
  },
};

const energieArticle: Article = {
  _id: 'seed-energie',
  titel: 'Gaskraftwerke, Erneuerbare, Technologieoffenheit: Warum mehrere Wege gleichzeitig nötig sein können',
  slug: 'energie-mehrere-wege',
  standfirst:
    'Die Debatte um Deutschlands Energiepolitik wird oft als Entweder-oder geführt. Ein genauer Blick zeigt: Versorgungssicherheit, Klimaschutz und Wettbewerbsfähigkeit verlangen parallele Antworten — und viele Positionen können gleichzeitig zutreffen.',
  veroeffentlicht: '2026-05-20',
  themen: [{ name: 'Energiepolitik', slug: 'energiepolitik' }],
  autoren: [{ name: 'Gurt-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Dies ist ein Demonstrationsbeitrag. Sämtliche Zahlen und Positionen sind ILLUSTRATIV und nicht aus offiziellen Quellen abgeleitet. Sie zeigen ausschließlich die Darstellungsformen der Plattform. Reale Beiträge stützen sich auf offizielle Quellen (data.europa.eu, Bundestag-DIP, Bundesregierung) und weisen Datenstand, Auswahl und Grenzen aus.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Der Aufbau neuer Gaskraftwerke gilt als nötig, um Versorgungssicherheit zu garantieren, wenn Wind und Sonne nicht ausreichen. Gleichzeitig sind Erneuerbare langfristig die günstigste Quelle und zentral für die Klimaziele. Und „Technologieoffenheit" hält weitere Optionen offen.',
    ),
    block(
      'normal',
      'Diese Wege schließen sich nicht aus — sie adressieren unterschiedliche Probleme zur selben Zeit. Die folgende Matrix macht sichtbar, wie verschiedene Akteure zu den drei Maßnahmen stehen.',
    ),
    positionsMatrix,
    block('h2', 'Stromerzeugung heute'),
    block(
      'normal',
      'Erneuerbare tragen den größten Anteil der Erzeugung; Gas bleibt vor allem für die gesicherte Leistung relevant. Der Vergleich der Größenordnungen ordnet die Debatte ein.',
    ),
    erzeugungBalken,
    block('h2', 'Zwei Kurven, eine Debatte'),
    block(
      'normal',
      'Wer von „Zurückfahren der Erneuerbaren" und „Setzen auf Gas" spricht, meint oft zwei parallele Investitionsverläufe. Beide nebeneinander zu sehen, schärft das Bild.',
    ),
    investitionenLinie,
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Mehrere Dinge können gleichzeitig richtig sein: gesicherte Leistung, der Ausbau der Erneuerbaren und das Offenhalten weiterer Technologien.',
      quelle: { titel: 'Illustratives Beispiel (keine reale Quelle)' },
    },
    {
      _type: 'vergleichBlock',
      _key: key(),
      titel: 'Zwei Maßnahmen im Vergleich',
      einleitung:
        'Beide Maßnahmen verfolgen legitime, aber unterschiedliche Ziele — Versorgungssicherheit kurzfristig, Klima und Kosten langfristig.',
      links: { titel: 'Neue Gaskraftwerke' },
      rechts: { titel: 'Ausbau Erneuerbare' },
    },
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Alle Daten in diesem Beitrag sind illustrativ und dienen nur der Demonstration. Reale Beiträge nutzen ausschließlich offizielle Quellen mit ausgewiesenem Datenstand.',
      quelle: { titel: 'Gurt — Methodik', url: 'https://gurt.report' },
    },
  ],
};

export const seedArticles: Article[] = [energieArticle];
