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

const eeFossilFlaeche: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Gestapelt: das fossile Band schrumpft, die Summe sinkt leicht',
    typ: 'flaeche',
    beschreibung:
      'Gestapeltes Flächendiagramm der öffentlichen Nettostromerzeugung 2015–2024 (Fraunhofer ISE), getrennt in erneuerbare und fossile Träger. Gestapelt zeigt sich neben dem Wechsel der Führung eine zweite Bewegung: Die erneuerbare Fläche wächst von 172,7 auf 255,3 TWh und verdrängt zunehmend die fossile (277,8 → 146,3 TWh). Die Summe beider Bänder sinkt zugleich von rund 450 auf 402 TWh — die Erzeugung aus diesen beiden Kategorien wird also grüner und insgesamt etwas kleiner. Kernenergie und Sonstige sind hier nicht enthalten; die Summe ist daher nicht die gesamte Stromerzeugung.',
    caption:
      'Erneuerbare und fossile öffentliche Nettostromerzeugung 2015–2024, gestapelt, in TWh (ohne Kernenergie/Sonstige). Quelle: Fraunhofer ISE / Energy-Charts.',
    encoding: { xFeld: 'jahr', yFeld: 'twh', serieFeld: 'bereich' },
    datensatz: {
      titel: 'Erneuerbare und fossile Stromerzeugung 2015–2024 (gestapelt)',
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
    'Stromdaten: Fraunhofer ISE / Energy-Charts, öffentliche Nettostromerzeugung, Jahreswerte 2015–2024 (abgerufen 06/2026), über den GURT-Adapter aus der API aggregiert. Metrik-Hinweis: Die „öffentliche Nettostromerzeugung" unterscheidet sich von der „ins Netz eingespeisten" Menge (Destatis) und der Bruttostromerzeugung (AG Energiebilanzen) — der EE-Anteil liegt je nach Abgrenzung bei rund 59–63 %. Pumpspeicher sind als Speicher ausgenommen; „Erdgas" ohne Kuppelgas. Positionen (Stand 2025) sind paraphrasiert und bequellt (ZDFheute, taz, pv-magazine, Umweltinstitut/Campact) — keine wörtlichen Zitate. Reproduzierbar über den Energy-Charts-Adapter (packages/data). Primärenergieverbrauch nach Energieträgern (Treemap, in PJ) und Erdgasverbrauch nach Verbrauchsbereichen (Sankey, in TWh = Mrd. kWh, brennwertbezogen) stammen aus der AG Energiebilanzen (Jahresbericht „Energieverbrauch in Deutschland 2023", vorläufige Angaben). Wichtige Abgrenzung: Die 96,5 TWh „Stromversorgung" im Sankey sind die Gas-Einsatzmenge (Input) für die Stromerzeugung, nicht die daraus erzeugte Strommenge — sie ist deshalb nicht mit den 43,6 TWh Gas-Stromerzeugung (Output) im Strommix vergleichbar. Der „Stromaustauschsaldo" (+42 PJ, 0,4 %) ist ein Bilanzposten (Nettoimport) und 2023 positiv. Der Diskurs-Abschnitt bildet den Stand Mai 2026 ab (Kabinettsbeschluss zum StromVKG, EU-beihilferechtliche Genehmigung noch ausstehend); die Sichtweisen sind paraphrasiert und je mit Quelle ausgewiesen (pv magazine, taz; u. a. BMWE, EU-Kommission, BDEW, Deutsche Umwelthilfe, Bundesverband Neue Energiewirtschaft) — ausgewählt, um das Spektrum ausgewogen abzubilden.',
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
    block(
      'normal',
      'Dieselben Zahlen, gestapelt statt als zwei Linien, zeigen eine zweite Bewegung: Die Summe aus erneuerbarer und fossiler Erzeugung ist über das Jahrzehnt von rund 450 auf 402 TWh gesunken, während das grüne Band das graue zunehmend verdrängt. Aus diesen beiden Kategorien zusammen wird also nicht nur sauberer, sondern auch etwas weniger Strom erzeugt (Kernenergie und Sonstige sind hier nicht enthalten).',
    ),
    eeFossilFlaeche,
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
      _type: 'diskursBlock',
      _key: key(),
      titel: 'Wie über die neuen Gaskraftwerke gestritten wird',
      frage: 'Braucht Deutschland neue Gaskraftwerke — und in welcher Form?',
      einleitung:
        'Im Mai 2026 beschloss das Bundeskabinett das Strom-Versorgungssicherheits- und Kapazitätsgesetz (StromVKG); erste Ausschreibungen sind ab September 2026 geplant, die endgültige EU-beihilferechtliche Genehmigung steht noch aus. Der Streit verläuft entlang mehrerer Achsen — Versorgungssicherheit, Kosten, Klima und Marktdesign. Ausgewählte Stimmen aus Politik, Wirtschaft und Verbänden (paraphrasiert, mit Quelle):',
      perspektiven: [
        {
          label: 'Bundesregierung (BMWE, Reiche)',
          aussage:
            'Die Ausschreibung von zwölf Gigawatt steuerbarer Leistung schaffe die Grundlage für eine gesicherte Stromversorgung und für die Wettbewerbsfähigkeit der Industrie — gerade in Dunkelflauten und nach dem Kohleausstieg.',
          quelle: {
            titel: 'Bundesregierung einigt sich mit EU-Kommission auf Eckpunkte der Kraftwerksstrategie',
            url: 'https://www.pv-magazine.de/2026/01/16/bundesregierung-einigt-sich-mit-eu-kommission-auf-eckpunkte-der-kraftwerksstrategie/',
            herausgeber: 'pv magazine',
          },
        },
        {
          label: 'EU-Kommission (Beihilferecht)',
          aussage:
            'Aus ursprünglich rund 20 Gigawatt wurden im Abgleich mit dem EU-Beihilferecht zwölf Gigawatt; die endgültige beihilferechtliche Genehmigung der Kommission steht noch aus.',
          quelle: {
            titel: 'Neue Gaskraftwerke: Bundesregierung einigt sich mit EU',
            url: 'https://taz.de/Neue-Gaskraftwerke/!6146169/',
            herausgeber: 'taz',
          },
        },
        {
          label: 'BDEW (Energiebranche, Kerstin Andreae)',
          aussage:
            'Der Branchenverband unterstützt den Aufbau gesicherter Leistung, mahnt aber Investitionssicherheit an: Die endgültige EU-Genehmigung solle vor dem Beginn der Ausschreibungen vorliegen.',
          quelle: {
            titel: 'Kraftwerksstrategie passiert Bundeskabinett',
            url: 'https://www.pv-magazine.de/2026/05/13/kraftwerksstrategie-passiert-bundeskabinett/',
            herausgeber: 'pv magazine',
          },
        },
        {
          label: 'Deutsche Umwelthilfe (Sascha Müller-Kraenner)',
          aussage:
            'Der Fokus auf fossile Stromerzeugung sei eine schlechte Nachricht für Stromkunden und Klimaziele; es fehle Technologieoffenheit und eine verbindliche Vorgabe für Wasserstoff aus erneuerbaren Quellen.',
          quelle: {
            titel: 'Neue Gaskraftwerke: Bundesregierung einigt sich mit EU',
            url: 'https://taz.de/Neue-Gaskraftwerke/!6146169/',
            herausgeber: 'taz',
          },
        },
        {
          label: 'Bundesverband Neue Energiewirtschaft (Robert Busch)',
          aussage:
            'Das Gesetz zementiere den Bau neuer Gaskraftwerke, statt einen Wettbewerb um die besten Lösungen — etwa Speicher und dezentrale Flexibilität — zu ermöglichen.',
          quelle: {
            titel: 'Kraftwerksstrategie passiert Bundeskabinett',
            url: 'https://www.pv-magazine.de/2026/05/13/kraftwerksstrategie-passiert-bundeskabinett/',
            herausgeber: 'pv magazine',
          },
        },
      ],
      einordnung:
        'Die Sichtweisen widersprechen sich weniger, als es scheint: gesicherte Leistung für Dunkelflauten, niedrige Kosten, Klimaschutz und ein technologieoffener Wettbewerb sind je für sich legitime Ziele. Strittig ist vor allem, wie viel fossile Kapazität nötig ist — und wie schnell sie auf Wasserstoff oder Alternativen umgestellt wird.',
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

// Benchmark-Beitrag #2: Verteidigung / Zeitenwende — echte, bequellte Daten.
const verteidigungAusgabenLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Verteidigungsausgaben im Anteil am BIP, 2014–2024',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der deutschen Verteidigungsausgaben als Anteil am realen Bruttoinlandsprodukt (NATO-Definition, Preisbasis 2021), 2014–2024. Der Wert steigt von 1,16 % (2014) auf 2,00 % (2024) — 2024 erreichte Deutschland erstmals seit Anfang der 1990er-Jahre die NATO-Marke von zwei Prozent. Der stärkste Sprung fällt mit dem Sondervermögen und der Zeitenwende ab 2022 zusammen.',
    caption:
      'Deutsche Verteidigungsausgaben als Anteil am realen BIP (NATO-Definition, Preisbasis 2021). 2024 erstmals 2,0 %. Quelle: NATO, Defence Expenditure of NATO Countries (2014–2025).',
    encoding: { xFeld: 'jahr', yFeld: 'anteil' },
    datensatz: {
      titel: 'Verteidigungsausgaben Deutschlands in % des BIP (NATO), 2014–2024',
      quelle: {
        titel: 'NATO — Defence Expenditure of NATO Countries (2014–2025)',
        url: 'https://www.nato.int/cps/en/natohq/news_236782.htm',
        herausgeber: 'NATO',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: '% BIP' },
      ],
      daten: [
        { jahr: '2014', anteil: 1.16 },
        { jahr: '2015', anteil: 1.16 },
        { jahr: '2016', anteil: 1.18 },
        { jahr: '2017', anteil: 1.21 },
        { jahr: '2018', anteil: 1.23 },
        { jahr: '2019', anteil: 1.33 },
        { jahr: '2020', anteil: 1.49 },
        { jahr: '2021', anteil: 1.43 },
        { jahr: '2022', anteil: 1.48 },
        { jahr: '2023', anteil: 1.61 },
        { jahr: '2024', anteil: 2.0 },
      ],
    },
  },
};

const natoBeeswarm: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Im Bündnis ist 2 % die Schwelle, nicht die Spitze',
    typ: 'beeswarm',
    beschreibung:
      'Beeswarm-Diagramm: Verteidigungsausgaben als Anteil am realen BIP 2024 (NATO-Schätzung, Preisbasis 2021) für 31 NATO-Mitglieder, je ein Punkt pro Land. Die Werte reichen von 1,19 % (Luxemburg) bis 3,79 % (Polen). Deutschland liegt mit genau 2,00 % auf dem NATO-Richtwert — und damit im Mittelfeld: Staaten an der Ostflanke wie Polen (3,79), Estland (3,37), Lettland (3,36) und Litauen (3,09) sowie die USA (3,21) und Griechenland (2,74) geben anteilig deutlich mehr aus; mehrere west- und südeuropäische Partner wie Spanien (1,43), Italien (1,50) und Belgien (1,29) liegen darunter. Eine gestrichelte Linie markiert den 2-%-Richtwert.',
    caption:
      'Verteidigungsausgaben als Anteil am realen BIP 2024, je ein Punkt pro NATO-Mitglied (Island ohne eigene Streitkräfte ausgenommen). Deutschland (hervorgehoben) liegt bei 2,0 %. Quelle: NATO, Defence Expenditure of NATO Countries (2014–2025).',
    encoding: {
      xFeld: '% des BIP (2024)',
      yFeld: 'prozent',
      kategorieFeld: 'land',
      highlight: 'Deutschland',
      refWert: 2.0,
      refLabel: 'NATO-Richtwert 2 %',
    },
    datensatz: {
      titel: 'Verteidigungsausgaben der NATO-Mitglieder in % des realen BIP, 2024 (Schätzung)',
      quelle: {
        titel: 'NATO — Defence Expenditure of NATO Countries (2014–2025), Tabelle 3',
        url: 'https://www.nato.int/cps/en/natohq/news_236782.htm',
        herausgeber: 'NATO',
      },
      spalten: [
        { name: 'land', typ: 'string' },
        { name: 'prozent', typ: 'number', einheit: '% BIP' },
      ],
      daten: [
        { land: 'Polen', prozent: 3.79 },
        { land: 'Estland', prozent: 3.37 },
        { land: 'Lettland', prozent: 3.36 },
        { land: 'USA', prozent: 3.21 },
        { land: 'Litauen', prozent: 3.09 },
        { land: 'Griechenland', prozent: 2.74 },
        { land: 'Finnland', prozent: 2.4 },
        { land: 'Vereinigtes Königreich', prozent: 2.33 },
        { land: 'Schweden', prozent: 2.31 },
        { land: 'Dänemark', prozent: 2.27 },
        { land: 'Norwegen', prozent: 2.27 },
        { land: 'Rumänien', prozent: 2.17 },
        { land: 'Ungarn', prozent: 2.13 },
        { land: 'Türkei', prozent: 2.13 },
        { land: 'Tschechien', prozent: 2.08 },
        { land: 'Frankreich', prozent: 2.03 },
        { land: 'Deutschland', prozent: 2.0 },
        { land: 'Niederlande', prozent: 2.0 },
        { land: 'Slowakei', prozent: 1.96 },
        { land: 'Bulgarien', prozent: 1.95 },
        { land: 'Nordmazedonien', prozent: 1.89 },
        { land: 'Kroatien', prozent: 1.87 },
        { land: 'Montenegro', prozent: 1.72 },
        { land: 'Albanien', prozent: 1.7 },
        { land: 'Portugal', prozent: 1.58 },
        { land: 'Italien', prozent: 1.5 },
        { land: 'Kanada', prozent: 1.47 },
        { land: 'Spanien', prozent: 1.43 },
        { land: 'Slowenien', prozent: 1.37 },
        { land: 'Belgien', prozent: 1.29 },
        { land: 'Luxemburg', prozent: 1.19 },
      ],
    },
  },
};

const sondervermoegenTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wohin das Sondervermögen fließt (Wirtschaftsplan 2022)',
    typ: 'treemap',
    beschreibung:
      'Treemap des Wirtschaftsplans 2022 für das 100-Milliarden-Sondervermögen der Bundeswehr (81,9 Mrd € Verpflichtungsermächtigungen) nach Dimensionen. Die Luftstreitkräfte dominieren mit 33,4 Mrd € (u. a. F-35, schwere Transporthubschrauber), gefolgt von Führung & Digitalisierung (20,7) und dem Heer (16,6). Die Marine erhält 8,8 Mrd €. Der Rest verteilt sich auf Ausrüstung und Forschung.',
    caption:
      'Wirtschaftsplan 2022 des Sondervermögens Bundeswehr (81,9 Mrd € Verpflichtungsermächtigungen) nach Dimensionen. Quelle: Bundesregierung/BMVg, Wirtschaftsplan 2022.',
    encoding: { kategorieFeld: 'dimension', yFeld: 'mrd' },
    datensatz: {
      titel: 'Sondervermögen Bundeswehr — Wirtschaftsplan 2022 nach Dimensionen',
      quelle: {
        titel: 'Sondervermögen Bundeswehr — Wirtschaftsplan 2022',
        url: 'https://de.wikipedia.org/wiki/Sonderverm%C3%B6gen_Bundeswehr',
        herausgeber: 'Bundesregierung / BMVg (zusammengefasst)',
      },
      spalten: [
        { name: 'dimension', typ: 'string' },
        { name: 'mrd', typ: 'number', einheit: 'Mrd €' },
      ],
      daten: [
        { dimension: 'Luftstreitkräfte', mrd: 33.4 },
        { dimension: 'Führung & Digitalisierung', mrd: 20.7 },
        { dimension: 'Heer (Land)', mrd: 16.6 },
        { dimension: 'Marine (See)', mrd: 8.8 },
        { dimension: 'Bekleidung & Ausrüstung', mrd: 1.9 },
        { dimension: 'Forschung & Technologie', mrd: 0.4 },
      ],
    },
  },
};

const verteidigungDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über die Aufrüstung gestritten wird',
  frage: 'Wie viel Verteidigung braucht Deutschland — und wie soll sie finanziert werden?',
  einleitung:
    'Die Richtung ist weithin Konsens, das Tempo und die Finanzierung sind umstritten. 2025 lockerte der Bundestag die Schuldenbremse für Verteidigungsausgaben oberhalb von 1 % des BIP; für 2026 sind rund 108 Mrd € vorgesehen, bis 2029 ein Anteil von 3,5 % des BIP, beim NATO-Gipfel in Den Haag wurde 2025 ein Ziel von 5 % (3,5 % Kern + 1,5 % verwandt) bis 2035 beschlossen. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Bundesregierung (Verteidigungsminister Pistorius, SPD)',
      aussage:
        'Angesichts der Bedrohung durch Russland seien deutlich steigende Verteidigungsausgaben „zwingend notwendig"; Deutschland müsse abschreckungs- und bündnisfähig werden.',
      quelle: {
        titel: 'Pistorius: Verteidigungsausgaben müssen deutlich steigen',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2025/kw20-de-verteidigung-1064970',
        herausgeber: 'Deutscher Bundestag',
      },
    },
    {
      label: 'NATO (Gipfel Den Haag 2025)',
      aussage:
        'Die Allianz beschloss ein neues Ziel: 3,5 % des BIP für Kernverteidigung plus 1,5 % für verteidigungsbezogene Ausgaben — zusammen 5 % bis 2035.',
      quelle: {
        titel: 'NATO-Gipfel 2025: Historischer Beschluss zu Verteidigungsausgaben',
        url: 'https://www.bmvg.de/de/aktuelles/nato-gipfel-2025-historischer-beschluss-verteidigungsausgaben-5952094',
        herausgeber: 'BMVg',
      },
    },
    {
      label: 'Bundesrechnungshof',
      aussage:
        'Kernaufgaben wie die Verteidigung sollten grundsätzlich aus laufenden Einnahmen finanziert werden, nicht über Schulden; eine Ausnahme von der Schuldenbremse solle allenfalls oberhalb von 2 % des BIP greifen. Die Verschuldungsdynamik berge langfristige Risiken.',
      quelle: {
        titel: 'Schuldenbremse: Umgehung gefährdet solide Staatsfinanzen',
        url: 'https://www.bundesrechnungshof.de/SharedDocs/Kurzmeldungen/DE/2025/aenderung-grundgesetz/kurzmeldung-1.html',
        herausgeber: 'Bundesrechnungshof',
      },
    },
    {
      label: 'Sachverständigenrat (Wirtschaftsweise)',
      aussage:
        'Das Sondervermögen solle „zusätzlich" wirken und stärker investitionsorientiert eingesetzt werden, damit es die Verteidigungsfähigkeit tatsächlich erhöht und nicht reguläre Ausgaben ersetzt.',
      quelle: {
        titel: 'Zusätzlichkeit und Investitionsorientierung des Sondervermögens verbessern (Jahresgutachten 2025/26)',
        url: 'https://www.sachverstaendigenrat-wirtschaft.de/fileadmin/dateiablage/gutachten/jg202526/JG202526_Kapitel_2.pdf',
        herausgeber: 'Sachverständigenrat',
      },
    },
    {
      label: 'Die Linke (Ulrich Thoden, MdB)',
      aussage:
        'Die Devise „Whatever it takes" sei ein „Blankoscheck" für die Rüstungsindustrie; Verteidigung müsse aus dem Kernhaushalt finanziert werden, und Diplomatie dürfe nicht in den Hintergrund treten.',
      quelle: {
        titel: 'Deutlicher Anstieg bei den Verteidigungsausgaben (Debatte)',
        url: 'https://www.bundestag.de/dokumente/textarchiv/2025/kw38-de-verteidigung-1103990',
        herausgeber: 'Deutscher Bundestag',
      },
    },
  ],
  einordnung:
    'Dass Deutschland nach Jahren der Unterfinanzierung wieder mehr in Verteidigung investiert, ist breiter Konsens. Strittig ist dreierlei: das Tempo (3,5 % bzw. 5 %), die Finanzierung (Schulden vs. Kernhaushalt) und die Wirksamkeit (ob das Geld die Truppe tatsächlich einsatzfähiger macht). Mehrere dieser Anliegen können gleichzeitig berechtigt sein.',
};

const verteidigungArticle: Article = {
  _id: 'seed-verteidigung',
  titel: 'Die Zeitenwende in Zahlen: Wie Deutschland seine Verteidigung umbaut',
  slug: 'zeitenwende-in-zahlen',
  standfirst:
    'Innerhalb eines Jahrzehnts ist Deutschland vom Zwei-Prozent-Nachzügler zum Land geworden, das die NATO-Marke erreicht — finanziert über ein 100-Milliarden-Sondervermögen und eine gelockerte Schuldenbremse. Die echten Zahlen zeigen, wie groß der Sprung ist, wohin das Geld fließt und worüber gestritten wird.',
  veroeffentlicht: '2026-06-01',
  themen: [{ name: 'Verteidigung', slug: 'verteidigung' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Ausgaben-Zeitreihe: NATO, „Defence Expenditure of NATO Countries (2014–2025)", Tabelle 3 (Anteil am realen BIP, Preisbasis 2021); 2024 ist eine NATO-Schätzung. Hinweis zur Abgrenzung: Auf Basis laufender Preise weist die NATO für 2024 rund 2,12 % aus — wir nutzen durchgängig die inflationsbereinigte Reihe (real, 2021er Preise: 2,00 % für 2024), damit die Jahre vergleichbar sind. Die NATO-Definition ist weiter gefasst als der Verteidigungshaushalt (Einzelplan 14) und enthält u. a. Pensionen und Teile anderer Ressorts. Der Bündnisvergleich (Beeswarm) nutzt dieselbe Tabelle 3 (realer BIP-Anteil 2024, je Mitglied; Deutschland 2,00 %); Island ist ohne eigene Streitkräfte und meldet keinen %BIP-Wert, daher 31 statt 32 Punkte. Struktur des Sondervermögens: Wirtschaftsplan 2022 (81,9 Mrd € Verpflichtungsermächtigungen nach Dimensionen); die vollen 100 Mrd € umfassen zusätzlich später verplante Mittel und Finanzierungskosten/Zinsen, das Sondervermögen war Ende 2024 vollständig vertraglich gebunden. Ziel- und Planwerte (2026: rund 108 Mrd €; 2029: rund 152 Mrd € bzw. 3,5 % BIP; 5 % bis 2035) nach BMVg und Bundestag. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt (Bundestag, Bundesrechnungshof, Sachverständigenrat, BMVg) — keine wörtlichen Zitate.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Nach dem russischen Überfall auf die Ukraine rief Bundeskanzler Olaf Scholz 2022 die „Zeitenwende" aus und kündigte ein Sondervermögen von 100 Milliarden Euro für die Bundeswehr an. 2025 lockerte der Bundestag zudem die Schuldenbremse: Verteidigungsausgaben oberhalb von einem Prozent des BIP sind seither von ihr ausgenommen. Damit ist nicht nur ein einmaliger Schub finanziert, sondern ein dauerhaft höheres Ausgabenniveau angelegt.',
    ),
    block(
      'normal',
      'Was bedeutet das in Zahlen? Drei Fragen führen durch diesen Beitrag: Wie groß ist der Sprung bei den Ausgaben? Wohin fließt das Geld? Und worüber wird gestritten?',
    ),
    block('h2', 'Vom Schlusslicht zur Zwei-Prozent-Marke'),
    block(
      'normal',
      'Über Jahre lag Deutschland deutlich unter der 2014 vereinbarten NATO-Marke von zwei Prozent des BIP. Erst 2024 wurde sie erreicht: Der Anteil stieg von 1,16 Prozent (2014) auf 2,00 Prozent — der stärkste Anstieg fällt mit Sondervermögen und Zeitenwende ab 2022 zusammen.',
    ),
    verteidigungAusgabenLinie,
    block(
      'normal',
      'Zwei Prozent sind im Bündnis allerdings die Eintrittsschwelle, nicht die Spitze. Im Vergleich aller NATO-Mitglieder liegt Deutschland 2024 genau auf der Marke — und damit im Mittelfeld: Die Staaten an der Ostflanke geben, gemessen an ihrer Wirtschaftskraft, mit Abstand am meisten aus.',
    ),
    natoBeeswarm,
    block('h2', 'Wohin die 100 Milliarden fließen'),
    block(
      'normal',
      'Das Sondervermögen ist kein laufendes Budget, sondern ein Investitionsprogramm. Der Wirtschaftsplan 2022 verteilte den größten Teil auf die Luftstreitkräfte — darunter die Beschaffung des US-Kampfjets F-35 und schwerer Transporthubschrauber — gefolgt von Führung und Digitalisierung sowie dem Heer. Bis Ende 2024 waren alle Mittel vertraglich gebunden.',
    ),
    sondervermoegenTreemap,
    block('h2', 'Der Streit über Tempo, Schulden und Wirkung'),
    block(
      'normal',
      'Dass Deutschland wieder mehr in Verteidigung investiert, ist breiter Konsens. Umstritten sind das Tempo des weiteren Anstiegs, die Finanzierung über Schulden statt aus dem Kernhaushalt und die Frage, ob das Geld die Truppe tatsächlich einsatzfähiger macht.',
    ),
    verteidigungDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Ausgaben: NATO, Defence Expenditure of NATO Countries (2014–2025), Tabelle 3 (real, 2021er Preise). Sondervermögen: Wirtschaftsplan 2022. Ziele/Planwerte: BMVg, Deutscher Bundestag. Positionen paraphrasiert nach Bundestag, Bundesrechnungshof und Sachverständigenrat. Abgrenzungs- und Metrik-Hinweise siehe Methodik.',
      quelle: { titel: 'NATO — Defence Expenditure of NATO Countries (2014–2025)', url: 'https://www.nato.int/cps/en/natohq/news_236782.htm' },
    },
  ],
};

// Benchmark-Beitrag #3: Migration & Arbeitsmarkt — strikt neutral, datenbasiert.
const herkunftslaenderTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Die zehn wichtigsten Herkunftsländer 2024',
    typ: 'treemap',
    beschreibung:
      'Treemap der zehn Länder mit der höchsten Nettozuwanderung ausländischer Staatsangehöriger nach Deutschland 2024. Die Ukraine führt (rund 121.000), gefolgt von Syrien (75.100) und Indien (41.300). Das Bild ist vielfältig: Flucht (Ukraine, Syrien, Afghanistan) steht neben Erwerbs- und Fachkräftezuwanderung (Indien auf Platz 3). Gezeigt sind die zehn größten Herkunftsländer; die gesamte Nettozuwanderung ausländischer Staatsangehöriger lag 2024 bei rund 511.000 Personen.',
    caption:
      'Nettozuwanderung ausländischer Staatsangehöriger 2024 nach den zehn wichtigsten Herkunftsländern. Quelle: Statistisches Bundesamt (über SVR).',
    encoding: { kategorieFeld: 'land', yFeld: 'personen' },
    datensatz: {
      titel: 'Nettozuwanderung ausländischer Staatsangehöriger 2024 — Top-10-Herkunftsländer',
      quelle: {
        titel: 'Statistisches Bundesamt 2025 (Wanderungsstatistik), zit. n. SVR „Fakten zur Einwanderung"',
        url: 'https://www.svr-migration.de/wp-content/uploads/2024/12/SVR_Kurzbuendig_Einwanderung_2025.pdf',
        herausgeber: 'Statistisches Bundesamt / SVR',
      },
      spalten: [
        { name: 'land', typ: 'string' },
        { name: 'personen', typ: 'number', einheit: 'Personen' },
      ],
      daten: [
        { land: 'Ukraine', personen: 121034 },
        { land: 'Syrien', personen: 75136 },
        { land: 'Indien', personen: 41300 },
        { land: 'Türkei', personen: 41140 },
        { land: 'Afghanistan', personen: 32729 },
        { land: 'Iran', personen: 17522 },
        { land: 'Kosovo', personen: 16836 },
        { land: 'Vietnam', personen: 12070 },
        { land: 'Pakistan', personen: 10949 },
        { land: 'China', personen: 10723 },
      ],
    },
  },
};

const zuwanderungsgruendeWaffle: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Warum Menschen aus Nicht-EU-Ländern 2024 kamen',
    typ: 'waffle',
    beschreibung:
      'Waffle-Diagramm der vier wichtigsten dokumentierten Zuwanderungsgründe von Drittstaatsangehörigen 2024: Asyl­erstanträge (229.751), Familiennachzug (rund 92.700), Erwerbstätigkeit (rund 52.700) und Ausbildung/Studium (rund 49.400). Wichtig zur Einordnung: Der Aufenthaltszweck wird nur bei Drittstaatsangehörigen erfasst — die EU-Binnenzuwanderung (überwiegend Arbeit und Familie) ist hier nicht enthalten. Jede Kachel steht für rund ein Prozent dieser vier Gründe.',
    caption:
      'Vier wichtigste Zuwanderungsgründe von Drittstaatsangehörigen 2024 (ohne EU-Freizügigkeit). Quelle: BAMF 2025 (über SVR).',
    encoding: { kategorieFeld: 'grund', yFeld: 'personen' },
    datensatz: {
      titel: 'Zuwanderungsgründe Drittstaatsangehöriger 2024 (vier größte)',
      quelle: {
        titel: 'BAMF 2025, zit. n. SVR „Fakten zur Einwanderung"',
        url: 'https://www.svr-migration.de/wp-content/uploads/2024/12/SVR_Kurzbuendig_Einwanderung_2025.pdf',
        herausgeber: 'BAMF / SVR',
      },
      spalten: [
        { name: 'grund', typ: 'string' },
        { name: 'personen', typ: 'number', einheit: 'Personen' },
      ],
      daten: [
        { grund: 'Asyl (Erstanträge)', personen: 229751 },
        { grund: 'Familiennachzug', personen: 92700 },
        { grund: 'Erwerbstätigkeit', personen: 52700 },
        { grund: 'Ausbildung & Studium', personen: 49400 },
      ],
    },
  },
};

const migrationDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über Zuwanderung und Arbeitsmarkt gestritten wird',
  frage: 'Wie viel Zuwanderung braucht der Arbeitsmarkt — und wie gelingt Integration?',
  einleitung:
    'Dass Deutschland angesichts einer schrumpfenden Erwerbsbevölkerung qualifizierte Zuwanderung braucht, ist unter Fachleuten breiter Konsens; umstritten sind das „Wie" der Steuerung, die Integration und das Verhältnis von Erwerbs- zu Fluchtmigration. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Institut der deutschen Wirtschaft (IW)',
      aussage:
        'Die größten Fachkräftelücken bestehen im Gesundheitswesen (rund 46.100 unbesetzte Stellen 2024) und im Baugewerbe (rund 41.300). Da die Zuwanderung aus den EU-Oststaaten versiege, gewinne die Anwerbung qualifizierter Fachkräfte aus Drittstaaten an Bedeutung.',
      quelle: {
        titel: 'Fachkräftezuwanderung aus EU-Osterweiterung versiegt — Alternativen benötigt',
        url: 'https://www.iwkoeln.de/studien/alexander-burstedde-fachkraeftezuwanderung-aus-eu-osterweiterung-versiegt-alternativen-benoetigt.html',
        herausgeber: 'IW Köln',
      },
    },
    {
      label: 'Bundesregierung (Fachkräfteeinwanderungsgesetz 2023)',
      aussage:
        'Mit dem reformierten Fachkräfteeinwanderungsgesetz und der „Chancenkarte" (Punktesystem) sollen legale Wege erleichtert und die qualifizierte Zuwanderung aus Drittstaaten um bis zu 60.000 Personen pro Jahr erhöht werden.',
      quelle: {
        titel: 'Fachkräfteeinwanderungsgesetz',
        url: 'https://www.bmas.de/DE/Arbeit/Migration-und-Arbeit/Rechtliches-zu-Einreise-Arbeitsmarktzugang-und-Absicherung/Fachkraefteeinwanderungsgesetz/fachkraefteeinwanderungsgesetz.html',
        herausgeber: 'BMAS',
      },
    },
    {
      label: 'Institut für Arbeitsmarkt- und Berufsforschung (IAB)',
      aussage:
        'Erwerbsmigration sei nötig, ihre Wirkung hänge aber an der Umsetzung — vor allem an der schnelleren Anerkennung ausländischer Abschlüsse; parallel müsse das inländische Potenzial (Qualifizierung, Erwerbsbeteiligung) gehoben werden.',
      quelle: {
        titel: 'Zum Gesetzentwurf zur Weiterentwicklung der Fachkräfteeinwanderung',
        url: 'https://iab.de/zum-gesetzentwurf-der-bundesregierung-zur-weiterentwicklung-der-fachkraefteeinwanderung/',
        herausgeber: 'IAB',
      },
    },
    {
      label: 'ver.di (Gewerkschaft)',
      aussage:
        'Ohne Zuwanderung würde der Arbeitsmarkt nicht wachsen, sondern schrumpfen: 2024 stieg die Beschäftigung von Ausländerinnen und Ausländern, während die der deutschen Beschäftigten zurückging. Entscheidend seien gute Arbeitsbedingungen und Integration.',
      quelle: {
        titel: 'Fachkräftemangel in Deutschland: Herausforderung und Wege in die Zukunft',
        url: 'https://www.verdi.de/politik-gesellschaft/fachkraeftemangel-deutschland-herausforderung-und-wege-zukunft',
        herausgeber: 'ver.di',
      },
    },
    {
      label: 'Sachverständigenrat (SVR Migration)',
      aussage:
        'Deutschland sei seit Jahrzehnten ein Einwanderungsland. Neben der qualifizierten Zuwanderung komme es auf Integration und auf das Ausschöpfen des inländischen Potenzials an; Erwerbs- und Fluchtmigration seien getrennt zu betrachten.',
      quelle: {
        titel: 'Fakten zur Einwanderung in Deutschland (Kurz & bündig 2025)',
        url: 'https://www.svr-migration.de/wp-content/uploads/2024/12/SVR_Kurzbuendig_Einwanderung_2025.pdf',
        herausgeber: 'SVR',
      },
    },
  ],
  einordnung:
    'Die Daten und die meisten Stimmen deuten in eine Richtung: Eine alternde Gesellschaft mit niedriger Geburtenrate ist auf Zuwanderung angewiesen, wenn der Arbeitsmarkt nicht schrumpfen soll. Strittig bleibt, wie qualifizierte Zuwanderung gezielt gewonnen, Integration verbessert und das inländische Potenzial besser genutzt werden kann — und wie sich Erwerbs- und Fluchtmigration zueinander verhalten.',
};

const migrationArticle: Article = {
  _id: 'seed-migration',
  titel: 'Zuwanderung und Arbeitsmarkt: Was die Zahlen zeigen',
  slug: 'migration-und-arbeitsmarkt',
  standfirst:
    'Die Nettozuwanderung ist seit dem Rekordjahr 2022 stark gesunken — zugleich altert Deutschland und die Erwerbsbevölkerung schrumpft. Die echten Zahlen zeigen, woher Menschen kommen, warum sie kommen und welche Rolle Zuwanderung für den Arbeitsmarkt spielt. Jenseits der Schlagzeilen ist das Bild vielschichtig.',
  veroeffentlicht: '2026-06-01',
  themen: [
    { name: 'Migration', slug: 'migration' },
    { name: 'Arbeitsmarkt', slug: 'arbeitsmarkt' },
  ],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquellen: Statistisches Bundesamt (Wanderungsstatistik, Demografie), Bundesamt für Migration und Flüchtlinge (BAMF, Zuwanderungsgründe/Asyl), Institut der deutschen Wirtschaft (IW, Fachkräftelücken), Bundesagentur für Arbeit (Beschäftigung), zusammengefasst u. a. im SVR-Faktenpapier „Fakten zur Einwanderung in Deutschland" (Stand Dezember 2025). Bezugsjahr ist durchgängig 2024, soweit nicht anders genannt. Wichtige Einordnung: Der Aufenthaltszweck wird nur bei Drittstaatsangehörigen erfasst — die EU-Binnenzuwanderung (überwiegend Arbeit und Familie) ist im Gründe-Diagramm nicht enthalten; das Waffle bildet die vier größten dokumentierten Gründe ab, nicht die gesamte Zuwanderung. Die Herkunftsländer-Treemap zeigt die zehn größten Herkunftsländer der Nettozuwanderung ausländischer Staatsangehöriger (Gesamtwert 2024 rund 511.000). Die Wanderungsstatistik ist seit dem Berichtsjahr 2016 wegen methodischer Änderungen nur eingeschränkt mit früheren Jahren vergleichbar. Positionen sind paraphrasiert und bequellt — keine wörtlichen Zitate. Bewusst getrennt behandelt: Erwerbs- und Fluchtmigration.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Deutschland ist seit 1957 — mit wenigen Ausnahmejahren — ein Einwanderungsland: Es ziehen mehr Menschen zu als fort. Nach dem Rekord von rund 1,46 Millionen Nettozuwanderung im Jahr 2022 (vor allem Geflüchtete aus der Ukraine) halbierte sich der Wert 2023 auf rund 663.000 und ging 2024 weiter auf rund 430.000 zurück.',
    ),
    block(
      'normal',
      'Zugleich altert die Gesellschaft: Die Geburtenrate fiel 2024 auf 1,35 Kinder je Frau — den niedrigsten Wert seit 2005 — und die Erwerbsbevölkerung schrumpft. Vor diesem Hintergrund führen drei Fragen durch den Beitrag: Woher kommen die Menschen? Warum kommen sie? Und welche Rolle spielt Zuwanderung für den Arbeitsmarkt?',
    ),
    block('h2', 'Woher die Menschen kommen'),
    block(
      'normal',
      'Die Herkunft ist vielfältig. 2024 stand die Ukraine zum dritten Mal in Folge an der Spitze, gefolgt von Syrien. Auffällig ist Platz drei: Indien — ein Hinweis auf wachsende Fachkräftezuwanderung. Flucht und Erwerbszuwanderung stehen also nebeneinander.',
    ),
    herkunftslaenderTreemap,
    block('h2', 'Warum sie kommen'),
    block(
      'normal',
      'Bei Drittstaatsangehörigen wird der Aufenthaltszweck erfasst. 2024 war Asyl der häufigste dokumentierte Grund, gefolgt von Familiennachzug, Erwerbstätigkeit sowie Ausbildung und Studium. Wichtig für die Einordnung: Die große EU-Binnenzuwanderung — überwiegend zum Arbeiten und aus familiären Gründen — taucht hier nicht auf, weil ihr Zweck nicht zentral erfasst wird.',
    ),
    zuwanderungsgruendeWaffle,
    block('h2', 'Was der Arbeitsmarkt braucht'),
    block(
      'normal',
      'Der Zusammenhang zum Arbeitsmarkt ist messbar: 2024 stieg die sozialversicherungspflichtige Beschäftigung von Ausländerinnen und Ausländern, während die der deutschen Beschäftigten zurückging. Ohne Zuwanderung würde der Arbeitsmarkt also nicht wachsen, sondern schrumpfen. Die größten Fachkräftelücken verzeichnete 2024 das Gesundheitswesen (rund 46.100 unbesetzte Stellen), gefolgt vom Baugewerbe (rund 41.300). Mit dem Fachkräfteeinwanderungsgesetz und der „Chancenkarte" will die Bundesregierung die qualifizierte Zuwanderung aus Drittstaaten um bis zu 60.000 Personen jährlich erhöhen.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Richtung herrscht weithin Einigkeit, über Tempo, Steuerung und Integration wird gestritten. Die folgenden Stimmen spannen das Feld auf.',
    ),
    migrationDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Statistisches Bundesamt (Wanderung, Demografie), BAMF (Gründe/Asyl), IW Köln (Fachkräftelücken), Bundesagentur für Arbeit (Beschäftigung); zusammengefasst im SVR-Faktenpapier 2025. Einordnungs- und Methodenhinweise siehe Methodik.',
      quelle: { titel: 'SVR — Fakten zur Einwanderung in Deutschland (2025)', url: 'https://www.svr-migration.de/wp-content/uploads/2024/12/SVR_Kurzbuendig_Einwanderung_2025.pdf' },
    },
  ],
};

// Benchmark-Beitrag #4: Wohnen / Bauen / Mieten — echte, bequellte Destatis-Daten.
const bauLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Genehmigt und gebaut: beide weit unter dem Ziel',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der genehmigten und der fertiggestellten Wohnungen in Deutschland 2022–2025 (Statistisches Bundesamt). Die Baugenehmigungen fielen von 354.200 (2022) auf 215.900 (2024, niedrigster Stand seit 2010) und stiegen 2025 erstmals wieder leicht auf 238.500. Die Fertigstellungen folgen mit Verzögerung nach unten: von rund 295.000 auf 206.600 (2025) — alle Werte liegen weit unter dem politischen Ziel von 400.000 neuen Wohnungen pro Jahr.',
    caption:
      'Genehmigte und fertiggestellte Wohnungen in Deutschland, 2022–2025. Zum Vergleich: das Koalitionsziel liegt bei 400.000/Jahr. Quelle: Statistisches Bundesamt.',
    encoding: { xFeld: 'jahr', yFeld: 'wohnungen', serieFeld: 'reihe' },
    datensatz: {
      titel: 'Baugenehmigungen und Baufertigstellungen 2022–2025',
      quelle: {
        titel: 'Statistisches Bundesamt — Baugenehmigungen / Baufertigstellungen',
        url: 'https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/_inhalt.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'reihe', typ: 'string' },
        { name: 'wohnungen', typ: 'number', einheit: 'Wohnungen' },
      ],
      daten: [
        { jahr: '2022', reihe: 'Genehmigungen', wohnungen: 354200 },
        { jahr: '2023', reihe: 'Genehmigungen', wohnungen: 260100 },
        { jahr: '2024', reihe: 'Genehmigungen', wohnungen: 215900 },
        { jahr: '2025', reihe: 'Genehmigungen', wohnungen: 238500 },
        { jahr: '2022', reihe: 'Fertigstellungen', wohnungen: 295300 },
        { jahr: '2023', reihe: 'Fertigstellungen', wohnungen: 294400 },
        { jahr: '2024', reihe: 'Fertigstellungen', wohnungen: 251900 },
        { jahr: '2025', reihe: 'Fertigstellungen', wohnungen: 206600 },
      ],
    },
  },
};

const gebaeudetypTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Wer baut was? Fertigstellungen 2024 nach Gebäudetyp',
    typ: 'treemap',
    beschreibung:
      'Treemap der 2024 fertiggestellten Wohnungen Deutschlands nach Gebäudetyp (Statistisches Bundesamt). Die meisten Wohnungen entstehen in Mehrfamilienhäusern (135.300), die überwiegend von Unternehmen errichtet werden. Einfamilienhäuser (54.500) brachen am stärksten ein (−22 % gegenüber 2023), weil hohe Zinsen vor allem private Bauherren treffen. „Sonstige" umfasst Wohnheime, Wohnungen in Nichtwohngebäuden und Baumaßnahmen an bestehenden Gebäuden.',
    caption:
      'Fertiggestellte Wohnungen 2024 nach Gebäudetyp (insgesamt 251.900). Quelle: Statistisches Bundesamt.',
    encoding: { kategorieFeld: 'typ', yFeld: 'wohnungen' },
    datensatz: {
      titel: 'Baufertigstellungen 2024 nach Gebäudetyp',
      quelle: {
        titel: 'Statistisches Bundesamt — 14,4 % weniger fertiggestellte Wohnungen im Jahr 2024',
        url: 'https://www.destatis.de/DE/Presse/Pressemitteilungen/2025/05/PD25_183_31121.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'typ', typ: 'string' },
        { name: 'wohnungen', typ: 'number', einheit: 'Wohnungen' },
      ],
      daten: [
        { typ: 'Mehrfamilienhäuser', wohnungen: 135300 },
        { typ: 'Einfamilienhäuser', wohnungen: 54500 },
        { typ: 'Sonstige (Wohnheime, Umbau u. a.)', wohnungen: 44500 },
        { typ: 'Zweifamilienhäuser', wohnungen: 17600 },
      ],
    },
  },
};

const wohnenDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über die Wohnungskrise gestritten wird',
  frage: 'Wie kommt Deutschland aus dem Bau-Tief — und wer schützt die Mieterinnen und Mieter?',
  einleitung:
    'Dass zu wenig gebaut wird und die Mieten in den Ballungsräumen steigen, ist unstrittig; über die Mittel wird gestritten. Im Oktober 2025 trat der „Bau-Turbo" in Kraft, der Genehmigungen beschleunigen soll. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Bundesregierung (BMWSB, „Bau-Turbo")',
      aussage:
        'Mit dem im Oktober 2025 in Kraft getretenen „Bau-Turbo" sollen Kommunen zusätzliche Wohnungen schneller und unter Bedingungen auch ohne Bebauungsplan zulassen können — um bezahlbaren Wohnraum zügiger zu schaffen.',
      quelle: {
        titel: 'Schneller bauen mit dem Wohnungsbau-Turbo',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/wohnungsbau-turbo-2354894',
        herausgeber: 'Bundesregierung',
      },
    },
    {
      label: 'Zentralverband Deutsches Baugewerbe (ZDB)',
      aussage:
        'Mehr als 760.000 Wohnungen seien genehmigt, aber noch nicht gebaut („Bauüberhang"). Viele Vorhaben scheiterten an Finanzierungskosten, Regulierung und fehlender Wirtschaftlichkeit; nötig sei daher ein „echter" Bau-Turbo mit besseren Rahmenbedingungen, nicht nur schnelleren Genehmigungen.',
      quelle: {
        titel: 'Wohnungsbau vor Absturz? Bauwirtschaft fordert echten Bau-Turbo',
        url: 'https://www.meistertipp.de/aktuelles/news/wohnungsbau-vor-absturz-bauwirtschaft-fordert-echten-bau-turbo',
        herausgeber: 'ZDB (zit. n. Meistertipp)',
      },
    },
    {
      label: 'Deutscher Mieterbund',
      aussage:
        'Sinkt der Neubau bei weiter hoher Nachfrage, verschärft sich die Wohnungsnot und die Mieten steigen. Nötig seien deutlich mehr sozialer Wohnungsbau und ein wirksamer Mieterschutz, etwa eine verlängerte und nachgeschärfte Mietpreisbremse.',
      quelle: {
        titel: 'Deutscher Mieterbund — Positionen zu Wohnungsbau und Mietrecht',
        url: 'https://www.mieterbund.de/',
        herausgeber: 'Deutscher Mieterbund',
      },
    },
    {
      label: 'Deutscher Städtetag',
      aussage:
        'Die Beschleunigung des Wohnungsbaus sei richtig; damit der Bau-Turbo vor Ort wirke, brauchten die Kommunen jedoch Planungshoheit, Personal und ausreichende Mittel.',
      quelle: {
        titel: 'Gesetz zur Beschleunigung des Wohnungsbaus und zur Wohnraumsicherung',
        url: 'https://www.staedtetag.de/themen/austausch-gesetz-beschleunigung-wohnungsbaus-wohnraumsicherung',
        herausgeber: 'Deutscher Städtetag',
      },
    },
  ],
  einordnung:
    'Die Diagnose teilen fast alle: zu wenig Neubau bei anhaltend hoher Nachfrage treibt die Mieten. Strittig ist der Weg — schnellere Genehmigungen, bessere wirtschaftliche Rahmenbedingungen, mehr sozialer Wohnungsbau und stärkerer Mieterschutz. Mehrere dieser Hebel können gleichzeitig nötig sein.',
};

const wohnenArticle: Article = {
  _id: 'seed-wohnen',
  titel: 'Wohnen: Warum so wenig gebaut wird — und die Mieten steigen',
  slug: 'wohnen-bauen-und-mieten',
  standfirst:
    'Deutschland verfehlt sein Wohnungsbau-Ziel deutlich: 2025 wurden so wenige Wohnungen fertig wie seit über einem Jahrzehnt nicht. Zugleich bleibt die Nachfrage hoch — und die Mieten steigen. Die echten Zahlen zeigen, wie groß die Lücke ist, wer was baut und worüber gestritten wird.',
  veroeffentlicht: '2026-06-02',
  themen: [{ name: 'Wohnen', slug: 'wohnen' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquelle: Statistisches Bundesamt (Destatis), Pressemitteilungen zu Baugenehmigungen (PD25_061 vom 18.02.2025; PD26_052 vom 18.02.2026) und Baufertigstellungen (PD25_183 vom 23.05.2025; PD26_174 vom 22.05.2026). Wichtige Abgrenzung: „Genehmigt" ist nicht „gebaut" — zwischen Genehmigung und Fertigstellung liegen zuletzt rund 26 Monate Bauzeit, und ein großer „Bauüberhang" (genehmigt, aber nicht fertiggestellt) ist noch offen. Das Ziel von 400.000 Wohnungen pro Jahr ist ein politisches Koalitionsziel der Bundesregierung, kein statistischer Wert. In der Treemap fasst „Sonstige" Wohnheime, Wohnungen in Nichtwohngebäuden und Baumaßnahmen an bestehenden Gebäuden zusammen (Residuum zur Gesamtzahl 2024). Mietangaben beziehen sich auf die amtlich gemessenen Nettokaltmieten im Verbraucherpreisindex; neu angebotene Wohnungen verteuern sich in Ballungsräumen erfahrungsgemäß schneller als der Index. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt — keine wörtlichen Zitate.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Deutschland hat Ende 2024 rund 43,8 Millionen Wohnungen — und baut zu wenige neue hinzu. Die Bundesregierung nennt seit Jahren das Ziel von 400.000 neuen Wohnungen pro Jahr. Die Wirklichkeit liegt weit darunter: Nach rund 294.000 Fertigstellungen in den Jahren 2021 bis 2023 sank die Zahl 2024 auf 251.900 und 2025 auf 206.600 — den niedrigsten Stand seit über einem Jahrzehnt.',
    ),
    block(
      'normal',
      'Zugleich bleibt die Nachfrage hoch. Wo weniger gebaut wird und viele eine Wohnung suchen, steigen die Mieten — besonders in den Städten. Drei Fragen führen durch den Beitrag: Wie groß ist die Lücke? Wer baut was? Und was folgt daraus für die Mieten?',
    ),
    block('h2', 'Genehmigt, gebaut — und das Ziel'),
    block(
      'normal',
      'Die Baugenehmigungen sind ein Frühindikator: Sie fielen von 354.200 (2022) über 260.100 (2023) auf 215.900 (2024) — den tiefsten Stand seit 2010. 2025 stiegen sie erstmals seit 2021 wieder leicht, auf 238.500. Die Fertigstellungen folgen mit Verzögerung nach unten, weil eine Neubauwohnung im Schnitt rund 26 Monate bis zur Fertigstellung braucht.',
    ),
    bauLinie,
    block(
      'normal',
      'Ein genehmigtes Vorhaben ist noch kein fertiges Haus: Nach Angaben der Bauwirtschaft sind mehr als 760.000 Wohnungen genehmigt, aber nicht gebaut — der sogenannte Bauüberhang. Viele Projekte stocken an gestiegenen Finanzierungs- und Baukosten.',
    ),
    block('h2', 'Wer baut was'),
    block(
      'normal',
      'Der Neubau verschiebt sich. Die meisten neuen Wohnungen entstehen in Mehrfamilienhäusern, die überwiegend von Unternehmen gebaut werden. Private Einfamilienhäuser brachen dagegen am stärksten ein — die gestiegenen Zinsen treffen vor allem Bauherren, die selbst finanzieren.',
    ),
    gebaeudetypTreemap,
    block('h2', 'Die Folge: steigende Mieten'),
    block(
      'normal',
      'Weniger Neubau bei anhaltend hoher Nachfrage verknappt das Angebot — und treibt die Preise. Die amtlich gemessenen Nettokaltmieten (Verbraucherpreisindex) steigen seit Jahren stetig; neu angebotene Wohnungen verteuern sich in den Ballungsräumen noch deutlich schneller. Der Wohnungsbau ist damit nicht nur eine Bau-, sondern auch eine soziale Frage.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose herrscht weithin Einigkeit, über die Mittel nicht. Schnellere Genehmigungen, bessere wirtschaftliche Bedingungen, mehr sozialer Wohnungsbau, stärkerer Mieterschutz — die folgenden Stimmen spannen das Feld auf.',
    ),
    wohnenDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Statistisches Bundesamt (Baugenehmigungen und Baufertigstellungen 2022–2025). Bauüberhang: Bauwirtschaft/ZDB. Positionen paraphrasiert nach Bundesregierung, ZDB, Deutscher Mieterbund und Deutscher Städtetag. Abgrenzungs- und Methodenhinweise siehe Methodik.',
      quelle: { titel: 'Statistisches Bundesamt — Bauen', url: 'https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Bauen/_inhalt.html' },
    },
  ],
};

// Benchmark-Beitrag #5: Rente & private Altersvorsorge — echte, bequellte Daten.
const altenquotientRatio: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Von 100 Erwachsenen sind immer mehr im Rentenalter',
    typ: 'verhaeltnis',
    beschreibung:
      'Verhältnis-Darstellung als 100 Personen-Icons je Jahr (gleiche Gesamtzahl, nur der Anteil ist eingefärbt → direkt vergleichbar): Von 100 Menschen ab 20 Jahren sind 2020 rund 26 im Rentenalter, 2040 rund 30 und 2060 rund 31. Der große Sprung liegt bis 2040 (Babyboomer gehen in Rente), danach ein Plateau. Abgeleitet aus dem Altenquotienten der 15. koordinierten Bevölkerungsvorausberechnung (moderate Variante: 34,8 / 43,4 / 44,7 Personen ab Regelaltersgrenze je 100 im erwerbsfähigen Alter). Die Anhebung der Regelaltersgrenze auf 67 dämpft den Anstieg.',
    caption:
      'Von je 100 Menschen ab 20 Jahren der Anteil im Rentenalter, 2020 / 2040 / 2060 (aus dem Altenquotienten abgeleitet). Quelle: Statistisches Bundesamt, 15. koordinierte Bevölkerungsvorausberechnung (moderate Variante).',
    encoding: { xFeld: 'jahr', yFeld: 'anteil', kategorieFeld: 'Erwerbsfähige', serieFeld: 'im Rentenalter' },
    datensatz: {
      titel: 'Anteil im Rentenalter je 100 Menschen ab 20 Jahren, 2020–2060 (aus Altenquotient abgeleitet)',
      quelle: {
        titel: 'Statistisches Bundesamt — 15. koordinierte Bevölkerungsvorausberechnung (zit. n. RVaktuell 2/2023)',
        url: 'https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Bevoelkerungsvorausberechnung/_inhalt.html',
        herausgeber: 'Statistisches Bundesamt',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'anteil', typ: 'number', einheit: 'von 100' },
      ],
      daten: [
        { jahr: '2020', anteil: 26 },
        { jahr: '2040', anteil: 30 },
        { jahr: '2060', anteil: 31 },
      ],
    },
  },
};

const renteHebelLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Was die Annahmen versprechen: Niveau hält, Beitrag steigt',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der Projektion von Rentenniveau und Beitragssatz bis 2039 aus dem Rentenversicherungsbericht 2025. Das Rentenniveau wird per Haltelinie bis 2031 bei 48 % gehalten und sinkt danach bis 2039 auf 46,3 %. Der Beitragssatz steigt von 18,6 % (bis 2027 stabil) über 20,0 % (2029) auf 21,2 % (2039). Beide Hebel bewegen sich, um die Rente trotz wachsender demografischer Last zu finanzieren.',
    caption:
      'Projektion: Rentenniveau und Beitragssatz bis 2039, in Prozent. Quelle: Rentenversicherungsbericht 2025 (Bundesregierung).',
    encoding: { xFeld: 'jahr', yFeld: 'prozent', serieFeld: 'kennzahl' },
    datensatz: {
      titel: 'Rentenniveau und Beitragssatz — Projektion 2025–2039',
      quelle: {
        titel: 'Rentenversicherungsbericht 2025',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/rentenbericht-2025-2394260',
        herausgeber: 'Bundesregierung / BMAS',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'kennzahl', typ: 'string' },
        { name: 'prozent', typ: 'number', einheit: '%' },
      ],
      daten: [
        { jahr: '2025', kennzahl: 'Rentenniveau', prozent: 48.0 },
        { jahr: '2027', kennzahl: 'Rentenniveau', prozent: 48.0 },
        { jahr: '2029', kennzahl: 'Rentenniveau', prozent: 48.0 },
        { jahr: '2039', kennzahl: 'Rentenniveau', prozent: 46.3 },
        { jahr: '2025', kennzahl: 'Beitragssatz', prozent: 18.6 },
        { jahr: '2027', kennzahl: 'Beitragssatz', prozent: 18.6 },
        { jahr: '2029', kennzahl: 'Beitragssatz', prozent: 20.0 },
        { jahr: '2039', kennzahl: 'Beitragssatz', prozent: 21.2 },
      ],
    },
  },
};

const renteDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über die Rente gestritten wird',
  frage: 'Wer trägt die wachsende Last — Beitragszahlende, Rentenbeziehende, Steuerzahlende oder die Jungen?',
  einleitung:
    'Dass die Demografie die umlagefinanzierte Rente unter Druck setzt, ist unstrittig; umstritten ist, an welchen Stellschrauben gedreht wird. Mit dem Rentenpaket 2025 hält die Bundesregierung das Niveau zunächst bei 48 %. Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Bundesregierung (BMAS, Rentenpaket 2025)',
      aussage:
        'Mit dem Rentenpaket 2025 werde das Rentenniveau über die Rentenanpassung 2031 hinaus bei 48 % gehalten, um die Renten verlässlich zu stabilisieren.',
      quelle: {
        titel: 'Rentenbericht 2025',
        url: 'https://www.bundesregierung.de/breg-de/aktuelles/rentenbericht-2025-2394260',
        herausgeber: 'Bundesregierung',
      },
    },
    {
      label: 'Deutsche Rentenversicherung (Bericht)',
      aussage:
        'Die Projektion zeigt einen steigenden Beitragssatz — bis 2039 auf rund 21 % — sowie einen hohen, über Steuern finanzierten Bundeszuschuss. Eine verlässliche, langfristige Finanzierung sei entscheidend.',
      quelle: {
        titel: 'Rentenversicherungsbericht 2025 (Kabinettbeschluss)',
        url: 'https://www.bmas.de/DE/Service/Presse/Pressemitteilungen/2025/bundeskabinett-beschliesst-rentenversicherungsbericht-2025.html',
        herausgeber: 'BMAS / Deutsche Rentenversicherung',
      },
    },
    {
      label: 'Institut der deutschen Wirtschaft (IW)',
      aussage:
        'Das dauerhafte Festschreiben des Niveaus sei teuer: Allein 2035 fehlten dadurch rund 34 Milliarden Euro. Ohne Anpassungen — etwa beim Renteneintrittsalter, beim Niveau oder durch mehr kapitalgedeckte Vorsorge — wachse die Last vor allem für die Jüngeren.',
      quelle: {
        titel: 'Rentenpaket II: 2035 fehlen 34 Milliarden Euro',
        url: 'https://www.iwkoeln.de/presse/iw-nachrichten/jochen-pimpertz-2035-fehlen-34-milliarden-euro.html',
        herausgeber: 'IW Köln',
      },
    },
    {
      label: 'Sozialverband VdK',
      aussage:
        'Das Rentenniveau müsse dauerhaft gesichert und eher angehoben werden, um Altersarmut zu verhindern; ein höheres Renteneintrittsalter und Leistungskürzungen lehnt der Verband ab.',
      quelle: {
        titel: 'Sozialverband VdK — Positionen zur Rente',
        url: 'https://www.vdk.de/deutschland/pages/themen/rente',
        herausgeber: 'Sozialverband VdK',
      },
    },
  ],
  einordnung:
    'Die Demografie ist gesetzt — strittig ist die Verteilung der Lasten. Jede Stellschraube verschiebt sie woandershin: ein höheres Niveau entlastet Rentnerinnen und Rentner, belastet aber Beitrags- und Steuerzahlende; ein höheres Eintrittsalter oder mehr Kapitaldeckung entlastet die Kasse, trifft aber andere. Mehrere dieser Antworten können zugleich nötig sein.',
};

const renteArticle: Article = {
  _id: 'seed-rente',
  titel: 'Die Rente und ihre Annahmen: Was trägt — und was, wenn es kippt?',
  slug: 'rente-und-ihre-annahmen',
  standfirst:
    'Die gesetzliche Rente ist umlagefinanziert: Die Beiträge von heute zahlen die Renten von heute. Das funktioniert, solange genug Erwerbstätige auf jede Rentnerin kommen — doch die geburtenstarken Jahrgänge gehen in Rente. Die echten Zahlen zeigen, wie stark die Last steigt, was die Annahmen versprechen und worüber gestritten wird.',
  veroeffentlicht: '2026-06-02',
  themen: [{ name: 'Rente', slug: 'rente' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquellen: Statistisches Bundesamt, 15. koordinierte Bevölkerungsvorausberechnung (moderate Annahmenkombination G2-L2-W2, Dezember 2022; Altenquotient in der sozialrechtlichen Definition „Personen ab Regelaltersgrenze je 100 Personen im Alter 20 bis zur Regelaltersgrenze" — sie berücksichtigt die Anhebung auf 67; die klassische 65+/20–64-Definition ergäbe höhere Werte, z. B. „fast 49" für 2040). Belegt sind die Stützjahre 2020, 2040 und 2060. Für die Icon-Darstellung wird der Altenquotient (34,8 / 43,4 / 44,7) in einen Anteil an je 100 Menschen ab 20 Jahren umgerechnet (Anteil = Quotient ÷ (100 + Quotient), gerundet: 26 / 30 / 31) — so haben alle Jahre dieselbe Gesamtzahl an Icons und sind direkt vergleichbar. Renten-Projektion: Rentenversicherungsbericht 2025 (Bundesregierung/BMAS); das Rentenniveau wird per Haltelinie bis zur Rentenanpassung 2031 bei 48 % gehalten und sinkt danach laut Projektion bis 2039 auf 46,3 %; der Beitragssatz bleibt bis 2027 bei 18,6 % und steigt danach (19,8 % 2028, 20,0 % 2029) bis 2039 auf 21,2 % (zentrale Projektion; je nach Modellvariante 20,7–21,6 % für 2039). Der jährliche Bundeszuschuss zur Rente liegt über 100 Milliarden Euro und ist einer der größten Posten im Bundeshaushalt. Projektionen sind keine Prognosen, sondern Modellrechnungen unter Annahmen. Positionen (Stand 2025/2026) sind paraphrasiert und bequellt.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Die gesetzliche Rente in Deutschland ist umlagefinanziert: Was Beschäftigte und Arbeitgeber heute einzahlen, wird unmittelbar an die heutigen Rentnerinnen und Rentner ausgezahlt. Dieses Versprechen ruht auf einer demografischen Annahme — dass genug Erwerbstätige auf jede Person im Ruhestand kommen. Genau diese Annahme gerät unter Druck, weil die geburtenstarken Jahrgänge in Rente gehen.',
    ),
    block(
      'normal',
      'Den fehlenden Betrag gleicht der Bund mit einem Zuschuss von über 100 Milliarden Euro pro Jahr aus — einem der größten Posten im Bundeshaushalt. Drei Fragen führen durch den Beitrag: Wie stark steigt die demografische Last? Was versprechen die Annahmen? Und worüber wird gestritten?',
    ),
    block('h2', 'Die demografische Last'),
    block(
      'normal',
      'Der Altenquotient setzt die Zahl der Menschen im Rentenalter ins Verhältnis zu denen im erwerbsfähigen Alter. Die folgende Darstellung macht es greifbar — jeweils 100 Erwachsene, nur der Anteil im Rentenalter wächst: 2020 sind es rund 26 von 100, 2040 rund 30 — und danach kaum mehr (31 im Jahr 2060). Der große Sprung liegt also bis etwa 2040, wenn die Babyboomer im Ruhestand sind; danach ein hohes Plateau. Die schrittweise Anhebung der Regelaltersgrenze auf 67 dämpft den Anstieg.',
    ),
    altenquotientRatio,
    block('h2', 'Was die Annahmen versprechen'),
    block(
      'normal',
      'Politik reagiert mit mehreren Stellschrauben. Das Rentenpaket 2025 hält das Rentenniveau — das Verhältnis einer Standardrente zum Durchschnittslohn — bis 2031 bei 48 Prozent; danach sinkt es laut Projektion bis 2039 auf 46,3 Prozent. Zugleich steigt der Beitragssatz von 18,6 auf 21,2 Prozent. Stabiles Niveau, höhere Beiträge und ein wachsender Steuerzuschuss greifen also ineinander.',
    ),
    renteHebelLinie,
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Diagnose herrscht weithin Einigkeit, über die Verteilung der Lasten nicht. Höheres oder niedrigeres Niveau, späteres Eintrittsalter, mehr kapitalgedeckte Vorsorge, ein größerer Steuerzuschuss — die folgenden Stimmen spannen das Feld auf.',
    ),
    renteDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Statistisches Bundesamt (15. koordinierte Bevölkerungsvorausberechnung) und Rentenversicherungsbericht 2025 (Bundesregierung/BMAS). Positionen paraphrasiert nach Bundesregierung, Deutscher Rentenversicherung, IW Köln und Sozialverband VdK. Definitions- und Modellhinweise siehe Methodik.',
      quelle: { titel: 'Rentenversicherungsbericht 2025', url: 'https://www.bundesregierung.de/breg-de/aktuelles/rentenbericht-2025-2394260' },
    },
  ],
};

const klimaEmissionenLinie: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Halbe Strecke geschafft — der steilere Teil liegt vor uns',
    typ: 'linie',
    beschreibung:
      'Liniendiagramm der deutschen Treibhausgasemissionen (ohne LULUCF, in Mt CO2-Äquivalent) von 1990 bis 2024 sowie der gesetzlichen Zielmarken. Die tatsächlichen Emissionen sinken von 1.252 Mt (1990) auf 649 Mt (2024) — ein Rückgang um 48 %. Zwischenwerte: 741 Mt (2020), 749 Mt (2022, leichter Wiederanstieg), 672 Mt (2023). Die zweite Linie zeigt die gesetzlichen Zielmarken des Klimaschutzgesetzes ausgehend von 2024: 438 Mt bis 2030 (−65 % ggü. 1990) und 150 Mt bis 2040 (−88 %); bis 2045 gilt Netto-Treibhausgasneutralität. Bis 2024 wurde knapp die Hälfte erreicht; die verbleibende Strecke bis 2030 und 2040 ist deutlich steiler als der bisherige Pfad.',
    caption:
      'Treibhausgasemissionen Deutschlands 1990–2024 (ohne LULUCF) und die gesetzlichen Zielmarken, in Mt CO2-Äquivalent. Quelle: Umweltbundesamt (finale Daten 2024); Zielmarken nach Bundes-Klimaschutzgesetz (§ 3).',
    encoding: { xFeld: 'jahr', yFeld: 'mt', serieFeld: 'reihe' },
    datensatz: {
      titel: 'Treibhausgasemissionen Deutschlands und gesetzliche Zielmarken, 1990–2040',
      quelle: {
        titel: 'Umweltbundesamt — Finale Daten für 2024: Emissionen um drei Prozent gesunken',
        url: 'https://www.umweltbundesamt.de/themen/finale-daten-fuer-2024-emissionen-um-drei-prozent',
        herausgeber: 'Umweltbundesamt',
      },
      spalten: [
        { name: 'jahr', typ: 'string' },
        { name: 'reihe', typ: 'string' },
        { name: 'mt', typ: 'number', einheit: 'Mt CO2-Äq.' },
      ],
      daten: [
        { jahr: '1990', reihe: 'Tatsächliche Emissionen', mt: 1252 },
        { jahr: '2020', reihe: 'Tatsächliche Emissionen', mt: 741 },
        { jahr: '2022', reihe: 'Tatsächliche Emissionen', mt: 749 },
        { jahr: '2023', reihe: 'Tatsächliche Emissionen', mt: 672 },
        { jahr: '2024', reihe: 'Tatsächliche Emissionen', mt: 649 },
        { jahr: '2024', reihe: 'Gesetzliche Zielmarke (KSG)', mt: 649 },
        { jahr: '2030', reihe: 'Gesetzliche Zielmarke (KSG)', mt: 438 },
        { jahr: '2040', reihe: 'Gesetzliche Zielmarke (KSG)', mt: 150 },
      ],
    },
  },
};

const klimaSektorenTreemap: BodyBlock = {
  _type: 'visualisierungBlock',
  _key: key(),
  visualisierung: {
    titel: 'Woher die Emissionen 2024 kamen',
    typ: 'treemap',
    beschreibung:
      'Treemap der deutschen Treibhausgasemissionen 2024 (649 Mt CO2-Äquivalent, ohne LULUCF) nach den Sektoren des Klimaschutzgesetzes. Die Fläche je Kachel entspricht dem Anteil: Energiewirtschaft 185 Mt, Industrie 153 Mt, Verkehr 143,1 Mt, Gebäude 100,5 Mt, Landwirtschaft 62,1 Mt sowie Abfallwirtschaft und Sonstiges 5,4 Mt. Der gesamte Emissionsrückgang gegenüber 2023 (−23 Mt) stammt fast vollständig aus der Energiewirtschaft (−17,6 Mt durch Rekord-Erneuerbare und weniger Kohle); Verkehr (−2,1 Mt) und Gebäude (−2,4 Mt) bewegten sich kaum, die Industrie blieb nahezu konstant.',
    caption:
      'Treibhausgasemissionen Deutschlands 2024 nach KSG-Sektoren, in Mt CO2-Äquivalent (ohne LULUCF). Quelle: Umweltbundesamt / Expertenrat für Klimafragen (Prüfbericht 2025).',
    encoding: { kategorieFeld: 'sektor', yFeld: 'mt' },
    datensatz: {
      titel: 'Treibhausgasemissionen nach KSG-Sektoren 2024',
      quelle: {
        titel: 'Expertenrat für Klimafragen — Prüfbericht zu den Emissionsdaten 2024',
        url: 'https://expertenrat-klima.de/fileadmin/ERK/Berichte/ERK2025_Pruefbericht-Emissionsdaten-2024-Projektionsdaten-2025.pdf',
        herausgeber: 'Expertenrat für Klimafragen',
      },
      spalten: [
        { name: 'sektor', typ: 'string' },
        { name: 'mt', typ: 'number', einheit: 'Mt CO2-Äq.' },
      ],
      daten: [
        { sektor: 'Energiewirtschaft', mt: 185.0 },
        { sektor: 'Industrie', mt: 153.0 },
        { sektor: 'Verkehr', mt: 143.1 },
        { sektor: 'Gebäude', mt: 100.5 },
        { sektor: 'Landwirtschaft', mt: 62.1 },
        { sektor: 'Abfall & Sonstiges', mt: 5.4 },
      ],
    },
  },
};

const klimaDiskurs: BodyBlock = {
  _type: 'diskursBlock',
  _key: key(),
  titel: 'Wie über den Klimakurs gestritten wird',
  frage: 'Ist Deutschland auf Kurs — oder verdeckt der Gesamtrückgang, dass die schwierigen Sektoren stehenbleiben?',
  einleitung:
    'Dass die Emissionen 2024 auf 649 Mt gesunken sind (−48 % gegenüber 1990), ist unstrittig. Umstritten ist die Deutung: Reicht das Tempo, woher kommt der Rückgang — und tragen alle Sektoren ihren Teil? Ausgewählte Stimmen (paraphrasiert, mit Quelle):',
  perspektiven: [
    {
      label: 'Umweltbundesamt (finale Daten 2024)',
      aussage:
        'Die Emissionen sind 2024 um 3,4 % auf 649 Mt gesunken und liegen damit 48 % unter dem Niveau von 1990. Getragen werde der Rückgang vor allem vom Ausbau der Erneuerbaren und dem Rückgang der Kohleverstromung; das Klimaziel für 2030 sei erreichbar.',
      quelle: {
        titel: 'Finale Daten für 2024: Emissionen um drei Prozent gesunken',
        url: 'https://www.umweltbundesamt.de/themen/finale-daten-fuer-2024-emissionen-um-drei-prozent',
        herausgeber: 'Umweltbundesamt',
      },
    },
    {
      label: 'Expertenrat für Klimafragen',
      aussage:
        'Das Gesamtbudget der Jahre 2021 bis 2030 werde laut Projektion eingehalten (Puffer rund 81 Mt). Zugleich überschritten Verkehr und Gebäude 2024 erneut ihre Jahresbudgets, stärker als im Vorjahr; die projizierte Minderung erreicht bis 2030 etwa 63 % statt der gesetzlichen 65 %, und das 2040-Ziel (−88 %) werde deutlich verfehlt.',
      quelle: {
        titel: 'Prüfbericht zu den Emissionsdaten 2024 und Projektionsdaten 2025',
        url: 'https://expertenrat-klima.de/fileadmin/ERK/Berichte/ERK2025_Pruefbericht-Emissionsdaten-2024-Projektionsdaten-2025.pdf',
        herausgeber: 'Expertenrat für Klimafragen',
      },
    },
    {
      label: 'Agora Energiewende',
      aussage:
        'Über 80 % des Rückgangs 2024 entfielen auf die Energiewirtschaft (Rekord-Erneuerbare, weniger Kohle). Strukturell habe sich wenig bewegt: Der Verkehrsrückgang sei vor allem konjunkturell, der Wärmepumpen-Absatz fiel um 44 %, die Sanierungsrate erreichte einen Tiefstand. National werde das Jahresziel gehalten, die EU-Vorgaben für Verkehr und Gebäude aber verfehlt.',
      quelle: {
        titel: 'Die Energiewende in Deutschland: Stand der Dinge 2024',
        url: 'https://www.agora-energiewende.de/publikationen/die-energiewende-in-deutschland-stand-der-dinge-2024',
        herausgeber: 'Agora Energiewende',
      },
    },
    {
      label: 'Wirtschaft (DIHK / Verbände)',
      aussage:
        'Ein starrer Zeitplan aus jahres- und sektorscharfen Vorgaben erzeuge vor allem Bürokratie und unnötige Kosten. Gefragt seien Technologieoffenheit, planbare Rahmenbedingungen und bezahlbare Energie; ein Teil des Rückgangs sei zudem Folge schwacher Konjunktur, nicht nur der Klimapolitik.',
      quelle: {
        titel: 'Klimaschutzprogramm — Stimmen aus Wirtschaft und Verbänden',
        url: 'https://www.haufe.de/sustainability/debatte/klimaschutzprogramm-stimmen-aus-wirtschaft-und-verbaenden_575768_680760.html',
        herausgeber: 'Haufe (Übersicht)',
      },
    },
    {
      label: 'Deutsche Umwelthilfe',
      aussage:
        'Das Tempo reiche nicht: Die Ziele für 2030 und 2040 würden ohne sofortige Nachsteuerung deutlich verfehlt, vor allem wegen Verkehr und Gebäuden. Die Novelle des Klimaschutzgesetzes — der Wegfall verbindlicher Jahres- und Sektorziele — verschleiere die Verantwortung; nötig sei ein wirksames Sofortprogramm.',
      quelle: {
        titel: 'Klimaziele 2030 und 2040 werden deutlich verfehlt — DUH fordert sofortige Nachsteuerung',
        url: 'https://www.duh.de/presse/pressemitteilungen/pressemitteilung/klimaziele-2030-und-2040-werden-deutlich-verfehlt-deutsche-umwelthilfe-fordert-sofortige-nachsteuer/',
        herausgeber: 'Deutsche Umwelthilfe',
      },
    },
  ],
  einordnung:
    'Mehreres ist zugleich richtig: Deutschland hat fast die Hälfte seiner Emissionen abgebaut und hält das kumulierte Budget bis 2030 voraussichtlich ein — und genau dieser Erfolg stammt fast nur aus dem Stromsektor. Verkehr und Gebäude verfehlen ihre Beiträge dauerhaft, ein Teil des jüngsten Rückgangs ist konjunkturell, und die Ziele für 2040 und die Neutralität 2045 liegen auf dem heutigen Pfad außer Reichweite. Der einfache Teil — den Strom sauberer zu machen — ist weitgehend gehoben; der schwierigere — Heizen und Verkehr — steht noch aus.',
};

const klimaArticle: Article = {
  _id: 'seed-klima',
  titel: 'Deutschlands Treibhausgase: 48 Prozent geschafft — der schwerere Teil kommt noch',
  slug: 'treibhausgase-und-klimaziele',
  standfirst:
    'Deutschland hat seine Treibhausgase seit 1990 fast halbiert: 2024 lagen sie bei 649 Millionen Tonnen, 48 Prozent unter dem Ausgangswert. Doch der Rückgang stammt fast vollständig aus dem Stromsektor, während Verkehr und Gebäude ihre Ziele verfehlen. Die echten Zahlen zeigen, was erreicht wurde, woher es kam — und wie steil der Weg zu den gesetzlichen Zielen 2030 und 2040 noch ist.',
  veroeffentlicht: '2026-06-02',
  themen: [{ name: 'Klima', slug: 'klima' }],
  autoren: [{ name: 'GURT-Redaktion', rolle: 'Datenjournalismus' }],
  methodik:
    'Datenquellen: Umweltbundesamt (Nationales Treibhausgasinventar, finale Daten 2024, veröffentlicht 14.03.2025) und Expertenrat für Klimafragen (Prüfbericht zu den Emissionsdaten 2024 und Projektionsdaten 2025, Mai 2025). Alle Emissionswerte sind Treibhausgase ohne den Sektor LULUCF (Landnutzung), in Mt CO2-Äquivalent nach den Sektoren des Bundes-Klimaschutzgesetzes (KSG). Die Jahreswerte der Linie stammen aus einer konsistenten UBA-Reihe: 1990 = 1.252, 2020 = 741 (−40,8 % ggü. 1990), 2022 = 749, 2023 = 672, 2024 = 649 (−48,2 %); der Pfad zwischen 1990 und 2020 verlief nicht linear (Plateau in den 2000er-Jahren, beschleunigte Minderung ab etwa 2018). Werte anderer Buchungssysteme (z. B. die Umweltökonomischen Gesamtrechnungen von Destatis) weichen ab und werden hier nicht gemischt. Die Zielmarken sind die gesetzlichen Zielwerte des KSG (§ 3): −65 % bis 2030 (≈ 438 Mt), −88 % bis 2040 (≈ 150 Mt), Netto-Treibhausgasneutralität bis 2045; die Verbindungslinie zwischen den Zielmarken ist illustrativ, nicht als jährliches Budget zu lesen. Die Sektorwerte 2024 (Energiewirtschaft 185, Industrie 153, Verkehr 143,1, Gebäude 100,5, Landwirtschaft 62,1, Abfall & Sonstiges 5,4) summieren sich auf 649,1 Mt und stammen aus dem Prüfbericht des Expertenrats (Tabelle 4); LULUCF (51,3 Mt Senke) ist nicht enthalten. Projektionen sind Modellrechnungen unter Annahmen, keine Prognosen. Positionen (Stand 2025) sind paraphrasiert und bequellt.',
  body: [
    block('h2', 'Worum es geht'),
    block(
      'normal',
      'Deutschland hat sich im Klimaschutzgesetz gesetzlich auf Ziele festgelegt: die Treibhausgase bis 2030 um 65 Prozent gegenüber 1990 zu senken, bis 2040 um 88 Prozent — und bis 2045 netto klimaneutral zu werden. Die finalen Zahlen für 2024 sind ein guter Anlass, nüchtern zu prüfen: Wo steht das Land auf diesem Weg?',
    ),
    block(
      'normal',
      '2024 lagen die Emissionen bei 649 Millionen Tonnen CO2-Äquivalent — 3,4 Prozent weniger als 2023 und 48 Prozent unter dem Wert von 1990. Knapp die Hälfte der Strecke ist also geschafft. Drei Fragen führen durch den Beitrag: Wie weit ist Deutschland gekommen? Woher kam der Rückgang? Und worüber wird gestritten?',
    ),
    block('h2', 'Fast die Hälfte geschafft'),
    block(
      'normal',
      'Seit 1990 sind die Emissionen von rund 1.252 auf 649 Millionen Tonnen gefallen. Der Weg dahin war nicht gleichmäßig: Nach einem langen Plateau in den 2000er-Jahren beschleunigte sich die Minderung ab etwa 2018, mit einem kleinen Wiederanstieg nach der Pandemie. Die folgende Linie zeigt den bisherigen Pfad — und daneben, wie steil es bis zu den gesetzlichen Zielmarken 2030 und 2040 weitergehen müsste.',
    ),
    klimaEmissionenLinie,
    block('h2', 'Woher der Rückgang kam'),
    block(
      'normal',
      'Der gesamte Rückgang gegenüber 2023 — 23 Millionen Tonnen — stammt fast vollständig aus einem einzigen Sektor: der Energiewirtschaft (−17,6 Mt), getragen von Rekord-Erneuerbaren und weniger Kohlestrom. Verkehr (−2,1 Mt) und Gebäude (−2,4 Mt) bewegten sich kaum, die Industrie blieb nahezu konstant. Die Treemap zeigt, wie sich die 649 Millionen Tonnen 2024 auf die Sektoren verteilen.',
    ),
    klimaSektorenTreemap,
    block(
      'normal',
      'Das ist der Kern der Debatte: Der einfache Hebel — sauberer Strom — ist weitgehend gezogen. Die verbleibenden großen Brocken liegen im Verkehr und in den Gebäuden, wo sich am wenigsten bewegt. Genau dort entscheidet sich, ob die Ziele für 2030 und 2040 erreichbar bleiben.',
    ),
    block('h2', 'Wie darüber gestritten wird'),
    block(
      'normal',
      'Über die Zahlen herrscht Einigkeit, über ihre Deutung nicht. Ist Deutschland auf Kurs, weil das Dekadenbudget eingehalten wird — oder neben der Spur, weil die schwierigen Sektoren stehenbleiben und das 2040-Ziel außer Reichweite gerät? Die folgenden Stimmen spannen das Feld auf.',
    ),
    klimaDiskurs,
    {
      _type: 'quellenNote',
      _key: key(),
      text: 'Daten: Umweltbundesamt (finale Daten 2024, Nationales Treibhausgasinventar) und Expertenrat für Klimafragen (Prüfbericht 2025). Alle Werte ohne LULUCF, in Mt CO2-Äquivalent. Zielmarken nach Bundes-Klimaschutzgesetz (§ 3). Positionen paraphrasiert nach Umweltbundesamt, Expertenrat für Klimafragen, Agora Energiewende, DIHK/Wirtschaftsverbänden und Deutscher Umwelthilfe. Methoden- und Definitionshinweise siehe Methodik.',
      quelle: {
        titel: 'Umweltbundesamt — Finale Daten für 2024',
        url: 'https://www.umweltbundesamt.de/themen/finale-daten-fuer-2024-emissionen-um-drei-prozent',
      },
    },
  ],
};

export const seedArticles: Article[] = [
  euDatenArticle,
  ...(hasDipData ? [dipArticle] : []),
  energieArticle,
  verteidigungArticle,
  migrationArticle,
  wohnenArticle,
  renteArticle,
  klimaArticle,
];
