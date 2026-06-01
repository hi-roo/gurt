import type { PortableTextBlock } from '@portabletext/types';
import type { Article, BodyBlock } from './types';
import { energieEuVisualisierung } from './datasets/energie-eu';
import { energieEuLaenderVisualisierung } from './datasets/energie-eu-laender';
import { dipEnergieVisualisierung, hasDipData } from './datasets/dip-energie';

/**
 * Seed-Inhalt: Bootstrap-Beiträge, bevor/falls kein Sanity-Projekt konfiguriert ist.
 *
 * Alle drei Beiträge nutzen ECHTE, bequellte Daten: Energie-Leuchtturm (Fraunhofer
 * ISE / Energy-Charts), EU-Open-Data (data.europa.eu) und Bundestag-DIP. Positionen
 * sind paraphrasiert und bequellt — keine erfundenen Zitate realer Personen (docs/07).
 * Datenstand, Metrik und Grenzen sind je Beitrag in Methodik/Quellen ausgewiesen.
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
      'Matrix aus drei Akteuren und drei energiepolitischen Maßnahmen (Stand 2025): neue Gaskraftwerke, Ausbau der Erneuerbaren, Technologieoffenheit. Sie zeigt, dass gesicherte Leistung, Erneuerbaren-Ausbau und Technologieoffenheit nebeneinander vertreten werden — mehrere Positionen können gleichzeitig zutreffen. Positionen sind paraphrasiert und bequellt (keine wörtlichen Zitate).',
    caption: 'Positionen ausgewählter Akteure zu drei parallelen Maßnahmen (Stand 2025; Quellen siehe Methodik).',
    positionen: [
      { akteur: 'BMWK (Reiche)', massnahme: 'Neue Gaskraftwerke', haltung: 'dafuer', zitat: 'Fordert gesicherte Leistung für Dunkelflauten: zunächst ≥20 GW, nach EU-Widerstand 12–12,5 GW.', quelle: { titel: 'ZDFheute', url: 'https://www.zdfheute.de/politik/reiche-eu-gaskraftwerke-plan-widerstand-100.html' } },
      { akteur: 'BMWK (Reiche)', massnahme: 'Ausbau Erneuerbare', haltung: 'differenziert', zitat: 'Hält das geplante Ausbautempo für überzogen; fordert „Realitätscheck" und Synchronisierung mit dem Netzausbau.', quelle: { titel: 'pv-magazine', url: 'https://www.pv-magazine.de/2025/05/09/katherina-reiche-fordert-realitaetscheck-fuer-die-energiewende/' } },
      { akteur: 'BMWK (Reiche)', massnahme: 'Technologieoffenheit', haltung: 'dafuer', zitat: 'Ein Teil der Kapazität soll technologieoffen ausgeschrieben werden.', quelle: { titel: 'taz', url: 'https://taz.de/Umstrittener-Ausbau/!6122082/' } },
      { akteur: 'EU-Kommission', massnahme: 'Neue Gaskraftwerke', haltung: 'differenziert', zitat: 'Untersagte 20 GW beihilferechtlich; Verhandlung über rund 12–12,5 GW.', quelle: { titel: 'ZDFheute', url: 'https://www.zdfheute.de/politik/reiche-eu-gaskraftwerke-plan-widerstand-100.html' } },
      { akteur: 'EU-Kommission', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer', zitat: 'Verbindliches EU-Ziel: mindestens 42,5 % Erneuerbare bis 2030 (RED III).', quelle: { titel: 'Europäische Kommission', url: 'https://germany.representation.ec.europa.eu/news/energie-und-klima-kommission-begrusst-einigung-zu-erneuerbaren-energien-startet-aufruf-unter-dem-2023-03-30_de' } },
      { akteur: 'EU-Kommission', massnahme: 'Technologieoffenheit', haltung: 'unklar', zitat: 'Keine eindeutige öffentliche Festlegung zu diesem Begriff in dieser Debatte.' },
      { akteur: 'Umweltverbände', massnahme: 'Neue Gaskraftwerke', haltung: 'dagegen', zitat: 'Fordern keine weiteren fossilen Kraftwerke.', quelle: { titel: 'Umweltinstitut', url: 'https://umweltinstitut.org/energie-und-klima/mitmachaktionen/keine-weiteren-fossilen-kraftwerke-in-deutschland/' } },
      { akteur: 'Umweltverbände', massnahme: 'Ausbau Erneuerbare', haltung: 'dafuer', zitat: 'Setzen auf konsequenten Ausbau der Erneuerbaren statt neuer fossiler Kraftwerke.', quelle: { titel: 'Campact', url: 'https://www.campact.de/klima/energiewende-retten-lobby-ministerin-reiche-stoppen/' } },
      { akteur: 'Umweltverbände', massnahme: 'Technologieoffenheit', haltung: 'differenziert', zitat: 'Sehen „Technologieoffenheit" skeptisch — als möglichen Vorwand für neue fossile Kapazitäten.', quelle: { titel: 'Umweltinstitut', url: 'https://umweltinstitut.org/energie-und-klima/mitmachaktionen/keine-weiteren-fossilen-kraftwerke-in-deutschland/' } },
    ],
  },
};

const erzeugungBalken: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Stromerzeugung nach Energieträger 2024',
    typ: 'waffle',
    beschreibung:
      'Waffle-Diagramm (Anteile am Ganzen) der öffentlichen Nettostromerzeugung Deutschlands 2024 nach Energieträger (Fraunhofer ISE / Energy-Charts). Jede der 100 Kacheln steht für rund 1 % der Erzeugung. Windkraft führt (136,3 TWh) vor Braunkohle (71,1) und Solar (59,7); Erdgas trägt 43,6 TWh bei. Erneuerbare stellen rund 62 %.',
    caption: 'Öffentliche Nettostromerzeugung 2024, Anteil je Energieträger. Quelle: Fraunhofer ISE / Energy-Charts.',
    encoding: { kategorieFeld: 'traeger', yFeld: 'twh' },
    datensatz: {
      titel: 'Stromerzeugung nach Energieträger 2024',
      quelle: {
        titel: 'Energy-Charts (Fraunhofer ISE)',
        url: 'https://www.energy-charts.info',
        herausgeber: 'Fraunhofer-Institut für Solare Energiesysteme ISE',
      },
      spalten: [
        { name: 'traeger', typ: 'string' },
        { name: 'twh', typ: 'number', einheit: 'TWh' },
      ],
      daten: [
        { traeger: 'Windkraft', twh: 136.3 },
        { traeger: 'Braunkohle', twh: 71.1 },
        { traeger: 'Solar', twh: 59.7 },
        { traeger: 'Erdgas', twh: 43.6 },
        { traeger: 'Biomasse', twh: 37 },
        { traeger: 'Steinkohle', twh: 23.8 },
        { traeger: 'Wasserkraft', twh: 22.3 },
        { traeger: 'Sonstige', twh: 18.5 },
      ],
    },
  },
};

const eeFossilLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Erneuerbare überholen die Fossilen',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der öffentlichen Nettostromerzeugung 2015–2024 in Terawattstunden, getrennt nach erneuerbaren und fossilen Trägern (Fraunhofer ISE). Die Erneuerbaren steigen von 172,7 auf 255,3 TWh, die Fossilen fallen von 277,8 auf 146,3 TWh; der Wechsel der Führung liegt um 2019.',
    caption: 'Öffentliche Nettostromerzeugung 2015–2024 in TWh. Quelle: Fraunhofer ISE / Energy-Charts.',
    encoding: { xFeld: 'jahr', yFeld: 'twh', serieFeld: 'bereich' },
    datensatz: {
      titel: 'Erneuerbare vs. fossile Stromerzeugung 2015–2024',
      quelle: {
        titel: 'Energy-Charts (Fraunhofer ISE)',
        url: 'https://www.energy-charts.info',
        herausgeber: 'Fraunhofer ISE',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'bereich', typ: 'string' },
        { name: 'twh', typ: 'number', einheit: 'TWh' },
      ],
      daten: [
        { jahr: '2015', bereich: 'Erneuerbare', twh: 172.7 },
        { jahr: '2016', bereich: 'Erneuerbare', twh: 173.3 },
        { jahr: '2017', bereich: 'Erneuerbare', twh: 199.3 },
        { jahr: '2018', bereich: 'Erneuerbare', twh: 206.4 },
        { jahr: '2019', bereich: 'Erneuerbare', twh: 225.3 },
        { jahr: '2020', bereich: 'Erneuerbare', twh: 234.6 },
        { jahr: '2021', bereich: 'Erneuerbare', twh: 219.7 },
        { jahr: '2022', bereich: 'Erneuerbare', twh: 233.2 },
        { jahr: '2023', bereich: 'Erneuerbare', twh: 249.7 },
        { jahr: '2024', bereich: 'Erneuerbare', twh: 255.3 },
        { jahr: '2015', bereich: 'Fossile', twh: 277.8 },
        { jahr: '2016', bereich: 'Fossile', twh: 283.2 },
        { jahr: '2017', bereich: 'Fossile', twh: 266.6 },
        { jahr: '2018', bereich: 'Fossile', twh: 251.5 },
        { jahr: '2019', bereich: 'Fossile', twh: 208.4 },
        { jahr: '2020', bereich: 'Fossile', twh: 179.1 },
        { jahr: '2021', bereich: 'Fossile', twh: 201.6 },
        { jahr: '2022', bereich: 'Fossile', twh: 209.9 },
        { jahr: '2023', bereich: 'Fossile', twh: 158.9 },
        { jahr: '2024', bereich: 'Fossile', twh: 146.3 },
      ],
    },
  },
};

const primaerenergieTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Primärenergieverbrauch 2023 nach Energieträgern',
    typ: 'treemap',
    beschreibung:
      'Treemap des Primärenergieverbrauchs Deutschlands 2023 (10.735 PJ) nach Energieträgern (AG Energiebilanzen). Die Fläche je Kachel entspricht dem Anteil: Mineralöl dominiert mit 3.822 PJ (35,6 %) vor Erdgas (2.655 PJ; 24,7 %) und erneuerbaren Energien (2.107 PJ; 19,6 %). Strom ist nur ein Ausschnitt dieses Gesamtsystems — Öl (vor allem im Verkehr) und Erdgas (vor allem für Wärme) prägen den Energieverbrauch weiterhin stark.',
    caption:
      'Primärenergieverbrauch Deutschland 2023 in Petajoule, Anteil je Energieträger. Quelle: AG Energiebilanzen (Jahresbericht 2023).',
    encoding: { kategorieFeld: 'traeger', yFeld: 'pj' },
    datensatz: {
      titel: 'Primärenergieverbrauch nach Energieträgern 2023',
      quelle: {
        titel: 'AG Energiebilanzen — Energieverbrauch in Deutschland 2023',
        url: 'https://ag-energiebilanzen.de/energieverbrauch-ist-2023-kraeftig-gesunken/',
        herausgeber: 'Arbeitsgemeinschaft Energiebilanzen e. V.',
      },
      spalten: [
        { name: 'traeger', typ: 'string' },
        { name: 'pj', typ: 'number', einheit: 'PJ' },
      ],
      daten: [
        { traeger: 'Mineralöl', pj: 3822 },
        { traeger: 'Erdgas', pj: 2655 },
        { traeger: 'Erneuerbare', pj: 2107 },
        { traeger: 'Steinkohle', pj: 931 },
        { traeger: 'Braunkohle', pj: 895 },
        { traeger: 'Sonstige', pj: 204 },
        { traeger: 'Kernenergie', pj: 79 },
        { traeger: 'Stromaustauschsaldo', pj: 42 },
      ],
    },
  },
};

const erdgasSankey: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wohin fließt das Erdgas?',
    typ: 'sankey',
    beschreibung:
      'Sankey-Diagramm des inländischen Erdgasabsatzes Deutschlands 2023 (721,8 TWh, brennwertbezogen) nach Verbrauchsbereichen (AG Energiebilanzen). Der größte Teil geht in die Industrie (246,6 TWh) und in die Wärmeversorgung privater Haushalte (229,0 TWh); die Stromversorgung erhält mit 96,5 TWh nur rund 13 %. Die Debatte um neue Gaskraftwerke betrifft damit einen vergleichsweise kleinen — für gesicherte Leistung aber wichtigen — Teil des Gasverbrauchs.',
    caption:
      'Inländischer Erdgasabsatz Deutschland 2023 in TWh (Brennwert, Gas-Input) nach Verbrauchsbereichen. Quelle: AG Energiebilanzen (Jahresbericht 2023).',
    encoding: { kategorieFeld: 'von', serieFeld: 'nach', yFeld: 'twh' },
    datensatz: {
      titel: 'Erdgasverbrauch nach Verbrauchsbereichen 2023',
      quelle: {
        titel: 'AG Energiebilanzen — Energieverbrauch in Deutschland 2023',
        url: 'https://ag-energiebilanzen.de/energieverbrauch-ist-2023-kraeftig-gesunken/',
        herausgeber: 'Arbeitsgemeinschaft Energiebilanzen e. V.',
      },
      spalten: [
        { name: 'von', typ: 'string' },
        { name: 'nach', typ: 'string' },
        { name: 'twh', typ: 'number', einheit: 'TWh' },
      ],
      daten: [
        { von: 'Erdgas', nach: 'Industrie', twh: 246.6 },
        { von: 'Erdgas', nach: 'Private Haushalte', twh: 229.0 },
        { von: 'Erdgas', nach: 'Gewerbe/Handel/Dienstl.', twh: 99.4 },
        { von: 'Erdgas', nach: 'Stromversorgung', twh: 96.5 },
        { von: 'Erdgas', nach: 'Fernwärme/Kälte', twh: 48.1 },
        { von: 'Erdgas', nach: 'Verkehr', twh: 2.2 },
      ],
    },
  },
};

const energieArticle: Article = {
  _id: 'seed-energie',
  titel: 'Gaskraftwerke, Erneuerbare, Technologieoffenheit: Warum mehrere Wege gleichzeitig nötig sein können',
  slug: 'energie-mehrere-wege',
  standfirst:
    'Wirtschaftsministerin Reiche will neue Gaskraftwerke — während die Erneuerbaren Rekorde brechen. Ein Widerspruch? Die echten Erzeugungsdaten zeigen: Versorgungssicherheit, Klimaschutz und Wettbewerbsfähigkeit verlangen parallele Antworten. Mehrere Dinge können gleichzeitig richtig sein.',
  veroeffentlicht: '2026-06-01',
  themen: [{ name: 'Energiepolitik', slug: 'energiepolitik' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Stromdaten: Fraunhofer ISE / Energy-Charts, öffentliche Nettostromerzeugung, Jahreswerte 2015–2024 (abgerufen 06/2026), über den GURT-Adapter aus der API aggregiert. Metrik-Hinweis: Die „öffentliche Nettostromerzeugung" unterscheidet sich von der „ins Netz eingespeisten" Menge (Destatis) und der Bruttostromerzeugung (AG Energiebilanzen) — der EE-Anteil liegt je nach Abgrenzung bei rund 59–63 %. Pumpspeicher sind als Speicher ausgenommen; „Erdgas" ohne Kuppelgas. Positionen (Stand 2025) sind paraphrasiert und bequellt (ZDFheute, taz, pv-magazine, Umweltinstitut/Campact) — keine wörtlichen Zitate. Reproduzierbar über den Energy-Charts-Adapter (packages/data). Primärenergieverbrauch nach Energieträgern (Treemap, in PJ) und Erdgasverbrauch nach Verbrauchsbereichen (Sankey, in TWh = Mrd. kWh, brennwertbezogen) stammen aus der AG Energiebilanzen (Jahresbericht „Energieverbrauch in Deutschland 2023", vorläufige Angaben). Wichtige Abgrenzung: Die 96,5 TWh „Stromversorgung" im Sankey sind die Gas-Einsatzmenge (Input) für die Stromerzeugung, nicht die daraus erzeugte Strommenge — sie ist deshalb nicht mit den 43,6 TWh Gas-Stromerzeugung (Output) im Strommix vergleichbar. Der „Stromaustauschsaldo" (+42 PJ, 0,4 %) ist ein Bilanzposten (Nettoimport) und 2023 positiv.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Wirtschaftsministerin Katharina Reiche (CDU) will neue Gaskraftwerke bauen lassen — zunächst war von mindestens 20 Gigawatt die Rede, nach Widerstand der EU-Kommission noch von rund 12 bis 12,5 GW. Sie sollen Versorgungssicherheit garantieren, wenn bei „Dunkelflaute" wenig Wind- und Solarstrom verfügbar ist. Zugleich nennt Reiche das geplante Tempo beim Ausbau der Erneuerbaren überzogen.',
    ),
    block(
      'normal',
      'Das klingt nach einem Widerspruch zu einer Energiewende, die messbar voranschreitet. Tatsächlich adressieren beide Wege unterschiedliche Probleme zur selben Zeit — gesicherte Leistung kurzfristig, Klima und Kosten langfristig. Die folgende Matrix macht sichtbar, wie verschiedene Akteure zu den drei Maßnahmen stehen.',
    ),
    positionsMatrix,
    block('h2', 'Der Strommix 2024'),
    block(
      'normal',
      'Die echten Erzeugungsdaten ordnen die Debatte ein: 2024 war Windkraft mit 136,3 TWh der mit Abstand wichtigste Stromlieferant, gefolgt von Braunkohle (71,1) und Solar (59,7). Erdgas trug 43,6 TWh bei — wichtig vor allem für die gesicherte Leistung, aber kein Schwergewicht im Mix.',
    ),
    erzeugungBalken,
    block('h2', 'Die Wende ist messbar'),
    block(
      'normal',
      'Im Zeitverlauf wird der Wandel deutlich: Die erneuerbare Erzeugung stieg von 172,7 TWh (2015) auf 255,3 TWh (2024), während die fossile von 277,8 auf 146,3 TWh fiel. Um 2019 zogen die Erneuerbaren erstmals an den Fossilen vorbei. Der Bedarf an gesicherter Leistung für Phasen ohne Wind und Sonne bleibt davon unberührt — genau hier setzen die Gaskraftwerks-Pläne an.',
    ),
    eeFossilLinie,
    block('h2', 'Strom ist nur ein Teil des Energiesystems'),
    block(
      'normal',
      'Die Strommix-Debatte verdeckt leicht, dass Strom nur einen Ausschnitt des Energieverbrauchs ausmacht. Über das gesamte Energiesystem betrachtet dominierten 2023 weiterhin fossile Energieträger: Mineralöl — vor allem im Verkehr — und Erdgas — vor allem für Wärme — stellten zusammen mehr als 60 Prozent des Primärenergieverbrauchs. Der Umbau der Stromerzeugung ist also weit fortgeschritten, der von Wärme und Verkehr steht größtenteils noch bevor.',
    ),
    primaerenergieTreemap,
    block('h2', 'Wohin das Erdgas wirklich fließt'),
    block(
      'normal',
      'Beim Erdgas zeigt der Verbrauch nach Bereichen, worum es bei den Gaskraftwerken geht — und worum nicht. 2023 floss der weitaus größte Teil des inländischen Erdgasabsatzes in die Industrie und in die Wärmeversorgung der Haushalte. Die Stromversorgung erhielt nur rund 13 Prozent. Neue Gaskraftwerke betreffen damit einen kleinen, aber für die gesicherte Leistung in Dunkelflauten wichtigen Teil des Gassystems.',
    ),
    erdgasSankey,
    {
      _type: 'zitatBlock',
      _key: key(),
      zitat:
        'Mehrere Dinge können gleichzeitig richtig sein: gesicherte Leistung für die Dunkelflaute, der weitere Ausbau der Erneuerbaren und das Offenhalten technologieoffener Optionen.',
      quelle: { titel: 'GURT — redaktionelle Einordnung' },
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
      text: 'Erzeugungsdaten: Fraunhofer ISE / Energy-Charts (öffentliche Nettostromerzeugung, 2015–2024). Primärenergieverbrauch und Erdgasverbrauch nach Bereichen: AG Energiebilanzen (Jahresbericht 2023). Positionen (Stand 2025) paraphrasiert nach ZDFheute, taz, pv-magazine sowie Umweltinstitut/Campact. Metrik- und Auswahlhinweise siehe Methodik.',
      quelle: { titel: 'Energy-Charts (Fraunhofer ISE)', url: 'https://www.energy-charts.info' },
    },
  ],
};

// Erster ECHTER Beitrag (nicht illustrativ): live erfasste Daten von data.europa.eu.
const euDatenArticle: Article = {
  _id: 'eu-energie-daten',
  titel: 'Wie viele offene Energie-Daten verzeichnet die EU?',
  slug: 'eu-energie-datensaetze',
  standfirst:
    'Ein erster Beitrag mit echten Zahlen statt Beispielwerten: Das EU-Open-Data-Portal listet zehntausende energiebezogene Datensätze — aber sehr ungleich über die Themen verteilt.',
  veroeffentlicht: '2026-05-31',
  themen: [
    { name: 'Energiepolitik', slug: 'energiepolitik' },
    { name: 'Offene Daten', slug: 'offene-daten' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquelle: data.europa.eu (EU Open Data Portal), Such-API, abgerufen am 31. Mai 2026. (1) Treffer je Stichwort: Gesamttreffermenge je deutschsprachigem Begriff (Volltextsuche, limit=0). (2) Herkunftsländer: relevanz-sortierte Stichprobe der 300 wichtigsten „Energie"-Treffer, aggregiert nach Land — keine Vollerhebung, daher als Stichprobe ausgewiesen. Die Zahlen spiegeln Datenverfügbarkeit und Verschlagwortung im Portal wider, nicht die reale energiewirtschaftliche Bedeutung. Reproduzierbar via „pnpm --filter @gurt/data ingest -- --source=data-europa-counts" bzw. „--source=data-europa-countries".',
  body: [
    block('h2', 'Echte Zahlen, offizielle Quelle'),
    block(
      'normal',
      'Anders als das Leitbeispiel weiter unten nutzt dieser Beitrag keine illustrativen Werte, sondern live abgefragte Metadaten des offiziellen EU-Open-Data-Portals. Die Visualisierung zeigt, zu welchen Energie-Stichwörtern wie viele offene Datensätze vorliegen.',
    ),
    {
      _type: 'visualisierungBlock',
      _key: key(),
      visualisierung: energieEuVisualisierung,
    },
    block(
      'normal',
      'Die Verteilung ist stark ungleich: Übergreifende Begriffe wie „Energie" und „Erneuerbare Energien" führen mit Abstand, während spezifische Felder wie Solarenergie oder Energieeffizienz nur wenige Hundert Treffer haben. Das sagt zunächst etwas über Verschlagwortung und Datenpraxis aus — nicht über die politische oder wirtschaftliche Bedeutung eines Themas.',
    ),
    block('h2', 'Woher die Daten kommen'),
    block(
      'normal',
      'Wer trägt eigentlich am meisten zu den offenen Energie-Daten bei? Eine Stichprobe der 300 relevantesten Treffer, aufgeschlüsselt nach Herkunftsland, zeigt ein klares Bild — mit einigen Überraschungen.',
    ),
    {
      _type: 'visualisierungBlock',
      _key: key(),
      visualisierung: energieEuLaenderVisualisierung,
    },
    block(
      'normal',
      'Deutschland und Dänemark liegen fast gleichauf vorn, gefolgt von Frankreich. Bemerkenswert: Das kleine Dänemark hält mit großen Mitgliedstaaten mit — ein Hinweis auf seine ausgeprägte Open-Data- und Energiedaten-Kultur. Da es sich um eine relevanz-sortierte Stichprobe handelt, ist dies eine Momentaufnahme, keine vollständige Länderstatistik.',
    ),
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten live abgefragt am 31. Mai 2026 über die Such-API von data.europa.eu (Treffer je Stichwort, limit=0).',
      quelle: { titel: 'data.europa.eu — EU Open Data Portal', url: 'https://data.europa.eu' },
    },
  ],
};

// Echter DIP-Beitrag (Deutscher Bundestag). Erscheint automatisch, sobald
// dip-energie.json befüllt ist (DIP_API_KEY erforderlich, siehe dip-energie.ts).
const dipArticle: Article = {
  _id: 'dip-energie-vorgaenge',
  titel: 'Energie im Bundestag: Wie viele Vorgänge pro Jahr?',
  slug: 'dip-energie-vorgaenge',
  standfirst:
    'Auf Basis des amtlichen Dokumentations- und Informationssystems (DIP) des Deutschen Bundestags: die parlamentarische Befassung mit dem Thema Energie im Zeitverlauf.',
  veroeffentlicht: '2026-05-31',
  themen: [
    { name: 'Energiepolitik', slug: 'energiepolitik' },
    { name: 'Parlament', slug: 'parlament' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquelle: Deutscher Bundestag, Dokumentations- und Informationssystem (DIP), API v1. Vollständige Auszählung aller im DIP erfassten Vorgänge mit dem Titelstichwort „Energie" (1976–2026, 1416 Vorgänge), aggregiert nach Vorgangsdatum — keine Stichprobe. Das laufende Jahr 2026 ist naturgemäß unvollständig. „Energie" im Titel ist ein grober Näherungswert für das Thema; verwandte Vorgänge ohne dieses Stichwort fehlen. Reproduzierbar via „pnpm --filter @gurt/data ingest -- --source=bundestag-dip --titel=Energie --pages=20". Ein DIP-API-Key ist erforderlich.',
  body: [
    block('h2', 'Parlamentarische Befassung im Zeitverlauf'),
    block(
      'normal',
      'Wie intensiv beschäftigt sich der Bundestag mit Energie? Die folgende Auswertung zählt die im DIP erfassten Vorgänge je Jahr — ein Indikator für die parlamentarische Aufmerksamkeit.',
    ),
    {
      _type: 'visualisierungBlock',
      _key: key(),
      visualisierung: dipEnergieVisualisierung,
    },
    block(
      'normal',
      'Das Bild ist eindeutig: In den 1970er- und 1980er-Jahren befasste sich der Bundestag nur vereinzelt mit „Energie", seit den 2000er-Jahren dauerhaft intensiv — mit einem Höchststand 2012. Die Auswertung zählt allein das Titelstichwort und ist damit ein grober, aber konsistenter Indikator für die parlamentarische Aufmerksamkeit über fünf Jahrzehnte.',
    ),
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Quelle: Deutscher Bundestag, DIP-API (v1), Vorgänge mit Titel-Filter „Energie".',
      quelle: {
        titel: 'Deutscher Bundestag — DIP',
        url: 'https://dip.bundestag.de',
      },
    },
  ],
};

export const seedArticles: Article[] = [
  euDatenArticle,
  ...(hasDipData ? [dipArticle] : []),
  energieArticle,
];
