/**
 * Legt KURATIERTE Beitrags-Ideen (Tier-1/2 aus der Themen-Priorisierung) als
 * `idee`-Dokumente in Sanity an — redaktionelle Vorschläge, kein Auto-Radar.
 * Reines ESM-JS (eingebautes fetch). Idempotent: createOrReplace mit
 * deterministischer _id (`idee.kurat.<slug>`).
 *
 *   node --env-file-if-exists=.env.local scripts/seed-ideen.mjs
 *   (oder: pnpm seed:ideen — lädt .env.local automatisch)
 */
const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Fehlt: SANITY_PROJECT_ID und/oder SANITY_WRITE_TOKEN (Editor-Token).');
  process.exit(1);
}

const entdecktAm = '2026-06-04';

/** Kuratierte Vorschläge (priorisiert; #9 Schuldenbremse ist bereits umgesetzt). */
const ideen = [
  {
    slug: 'buergergeld-grundsicherung',
    titel: 'Bürgergeld / Neue Grundsicherung: Wie hoch, unter welchen Bedingungen?',
    themenfeld: 'Sozialstaat',
    leitfrage: 'Wie hoch sollen Sozialleistungen sein — und an welche Mitwirkung geknüpft?',
    anlass: 'Reform zur „Neuen Grundsicherung" 2025/26 (schärfere Mitwirkung/Sanktionen, Regelsatz-Nullrunde 2026); Streit um Anreiz vs. Existenzminimum (BVerfG).',
    vizIdee: 'Regelsatz-Entwicklung real, Empfängerstruktur (Erwerbsfähige/Aufstocker), Lohnabstand; Diskurs-Block Fördern/Fordern vs. Würde.',
    kandidatenQuellen: ['BMAS', 'Bundesagentur für Arbeit / IAB', 'BVerfG (Existenzminimum)', 'Statistisches Bundesamt'],
  },
  {
    slug: 'fossile-subventionen',
    titel: 'Subventionen für fossile Brennstoffe: streichen oder umschichten?',
    themenfeld: 'Klima',
    leitfrage: 'Sollten umweltschädliche Subventionen abgebaut oder umgeschichtet werden?',
    anlass: 'UBA beziffert umweltschädliche Subventionen auf rund 65 Mrd €/Jahr; Streit um Diesel-, Dienstwagen-, Agrardiesel- und Kerosinprivileg (Bauernproteste 2024).',
    vizIdee: 'Treemap der umweltschädlichen Subventionen nach Bereich; Verteilungswirkung des Abbaus.',
    kandidatenQuellen: ['Umweltbundesamt (UBA)', 'Bundesfinanzministerium (Subventionsbericht)', 'Forum Ökologisch-Soziale Marktwirtschaft (FÖS)'],
  },
  {
    slug: 'fracking-heimische-gasfoerderung',
    titel: 'Fracking & heimische Gasförderung: neue Projekte für die Versorgung?',
    themenfeld: 'Energiepolitik',
    leitfrage: 'Dürfen neue Gasprojekte (z. B. in Niedersachsen) starten, um die Versorgung zu sichern?',
    anlass: 'Borkum-Gasprojekt und Debatte um heimische Förderung/Reserven vs. Klima und lokalen Widerstand.',
    vizIdee: 'Anteil heimischer Förderung am Verbrauch, Reserven, Methan-Emissionen; Positions-Matrix der Akteure.',
    kandidatenQuellen: ['LBEG Niedersachsen', 'BVEG (Branchenverband)', 'Umweltbundesamt', 'AG Energiebilanzen'],
  },
  {
    slug: 'ganztagsschulen',
    titel: 'Ganztagsschulen: Reicht das Ausbautempo für den Rechtsanspruch?',
    themenfeld: 'Bildung',
    leitfrage: 'Soll der Ganztagsausbau vorangetrieben werden — und reicht das Tempo zum Rechtsanspruch?',
    anlass: 'Rechtsanspruch auf Ganztagsbetreuung in der Grundschule ab 2026 (stufenweise); große Betreuungslücke, Bund-Länder-Finanzierung.',
    vizIdee: 'Ausbaustand/Betreuungslücke nach Ländern, Bund-Länder-Mittel, OECD-Vergleich, Herkunftseffekt.',
    kandidatenQuellen: ['Statistisches Bundesamt', 'KMK', 'Bertelsmann Stiftung', 'OECD — Education at a Glance'],
  },
  {
    slug: 'fachkraefte-migration',
    titel: 'Legale Migrationswege für Fachkräfte: mehr oder weniger?',
    themenfeld: 'Migration',
    leitfrage: 'Soll es mehr legale Migrationswege geben, etwa für Fachkräfte?',
    anlass: 'Fachkräfteeinwanderungsgesetz 2023/24 (Chancenkarte/Punktesystem); Engpassberufe und demografische Lücke.',
    vizIdee: 'Offene Stellen/Engpassberufe, Erwerbsmigration über Zeit, demografischer Ersatzbedarf.',
    kandidatenQuellen: ['Bundesagentur für Arbeit / IAB', 'SVR (Migration)', 'BAMF', 'Statistisches Bundesamt'],
  },
  {
    slug: 'steuerlast-progression',
    titel: 'Steuerpolitik: Wer trägt wie viel — und wer soll mehr zahlen?',
    themenfeld: 'Haushalt',
    leitfrage: 'Progressive Besteuerung vs. Entlastung — wer soll mehr oder weniger zahlen?',
    anlass: 'Dauerdebatte um Spitzensteuersatz, Reichen-/Erbschaft-/Vermögensteuer und kalte Progression. (Hinweis: „Flat Tax" ist in DE Randidee — auf reale Debatte zuschneiden.)',
    vizIdee: 'Steuer- und Abgabenlast nach Einkommens-Dezilen; Aufkommen je Steuerart; Verteilungswirkung.',
    kandidatenQuellen: ['Statistisches Bundesamt (Lohn-/Einkommensteuerstatistik)', 'DIW', 'ifo', 'Bundesfinanzministerium'],
  },
  {
    slug: 'atomkraft-wiedereinstieg-kosten',
    titel: 'Atomkraft: Was würde ein Wiedereinstieg kosten und dauern?',
    themenfeld: 'Energiepolitik',
    leitfrage: 'Brückentechnologie oder endgültig vorbei — was kostet ein Wiedereinstieg?',
    anlass: 'Nach dem Ausstieg im April 2023 wiederkehrende Debatte um Rückkehr; faktisch teure und langwierige Neubauten.',
    vizIdee: 'Strom-/Baukosten neuer AKW (LCOE, Bauzeiten) vs. Erneuerbare; Reststromanteil vor dem Ausstieg; Endlagerfrage.',
    kandidatenQuellen: ['Fraunhofer ISE', 'IEA / OECD-NEA', 'Öko-Institut', 'BGE (Endlagerung)'],
  },
  {
    slug: 'eu-mercosur-handel',
    titel: 'Handelspolitik: Freihandel (Mercosur) vs. Schutz lokaler Industrien',
    themenfeld: 'Außenhandel',
    leitfrage: 'Freihandelsabkommen wie Mercosur — überwiegen Chancen oder Risiken?',
    anlass: 'EU-Mercosur-Abschluss Ende 2024; Ratifizierung umstritten (Agrar, Frankreich, Entwaldung).',
    vizIdee: 'Handelsvolumina + betroffene Sektoren (Auto-Export vs. Agrar-Import), Zölle, CO₂/Entwaldung.',
    kandidatenQuellen: ['Europäische Kommission (DG Trade)', 'Eurostat', 'ifo', 'WTO'],
  },
  {
    slug: 'chatkontrolle-ueberwachung',
    titel: 'Überwachung vs. Privatsphäre: Chatkontrolle und Gesichtserkennung',
    themenfeld: 'Digitales',
    leitfrage: 'Wie viel Kontrolle dürfen Staaten ausüben — Sicherheit vs. Privatsphäre?',
    anlass: 'EU-Verordnung gegen Kindesmissbrauch („Chatkontrolle"/CSAR) und biometrische Überwachung (AI Act); Streit um Verschlüsselung.',
    vizIdee: 'Zeitleiste des EU-Verfahrens; Verdachtsmeldungen und Fehlerraten von Inhaltescanning/Gesichtserkennung.',
    kandidatenQuellen: ['Europäische Kommission', 'Europäisches Parlament', 'Bundesbeauftragte für Datenschutz (BfDI)', 'EDRi'],
  },
  {
    slug: 'china-de-risking',
    titel: 'China-Abhängigkeit: Wie unabhängig kann Deutschland werden?',
    themenfeld: 'Wirtschaft',
    leitfrage: 'Wie groß ist die wirtschaftliche Abhängigkeit von China — und wie viel De-Risking ist möglich?',
    anlass: 'China-Strategie der Bundesregierung 2023 und „De-Risking"-Debatte; kritische Rohstoffe und Vorprodukte.',
    vizIdee: 'Importanteile aus China bei kritischen Rohstoffen/Vorprodukten; Handelsbilanz über Zeit.',
    kandidatenQuellen: ['Statistisches Bundesamt (Außenhandel)', 'BGR (Rohstoffe)', 'ifo', 'MERICS'],
  },
  // Aus Gesprächsnotizen mit GURT-Nutzer:innen (2026-06-05).
  {
    slug: 'sozialstaat-finanzierung-arbeit-kapital',
    titel: 'Wer finanziert den Sozialstaat? Abgaben auf Arbeit gegen Erträge aus Kapital',
    themenfeld: 'Sozialstaat',
    leitfrage:
      'Sollten alle in die Sozialversicherung einzahlen — und sollten auch Kapitalerträge Sozialabgaben tragen?',
    anlass:
      'Aus Nutzer-Gesprächen: Sozialbeiträge fallen nur auf Arbeitseinkommen (bis zur Beitragsbemessungsgrenze), Kapitalerträge werden mit 25 % Abgeltungssteuer pauschal besteuert und tragen keine Sozialabgaben. Dauerdebatte um Bürgerversicherung (alle einbeziehen) und die Belastungsschere Arbeit vs. Kapital; Grundfrage: Ist allgemeine Solidarität eine verankerte Bürger-/Unternehmenspflicht?',
    vizIdee:
      'Gesamte Abgabenlast auf Arbeitseinkommen (ESt + SV, OECD-Abgabenkeil) vs. Kapitalerträge (Abgeltungssteuer); Aufkommen Lohnsteuer+SV vs. Abgeltungssteuer; Anteil Arbeits- vs. Kapitaleinkommen; Diskurs-Block (Bürgerversicherung · Wettbewerbs-/Kapitaldeckungs-Argument · Eigentums-/Verfassungssicht).',
    kandidatenQuellen: [
      'OECD (Taxing Wages / Abgabenkeil)',
      'Statistisches Bundesamt (Lohn- und Einkommensteuerstatistik)',
      'GKV-Spitzenverband / Deutsche Rentenversicherung (Beitragsbemessung)',
      'DIW / ifo',
      'Bundesfinanzministerium (Steueraufkommen)',
    ],
    entdecktAm: '2026-06-05',
    radarQuelle: 'Nutzer-Feedback (Gespräche), kuratiert',
    status: 'umgesetzt', // Beitrag „Wer finanziert den Sozialstaat?" (2026-06-05)
  },
  {
    slug: 'staatsausgaben-wofuer-neuschulden',
    titel: 'Wofür gibt der Staat das Geld aus — und wofür die neuen Schulden?',
    themenfeld: 'Haushalt',
    leitfrage:
      'Wofür werden Bundesmittel und die neue Verschuldung tatsächlich verwendet — Investition oder Konsum?',
    anlass:
      'Aus Nutzer-Gesprächen: Wunsch nach Transparenz über die tatsächlichen Staatsausgaben und die Verwendung von Neuverschuldung und Sondervermögen (Infrastruktur, Verteidigung). Schließt an den Schuldenbremse-Beitrag an.',
    vizIdee:
      'Bundeshaushalt nach Einzelplänen/Funktionen (Treemap); Mittelfluss Einnahmen → Ausgaben (Sankey); Aufteilung der Neuverschuldung/Sondervermögen nach investiv vs. konsumtiv.',
    kandidatenQuellen: [
      'Bundesfinanzministerium (Bundeshaushalt / Haushaltsplan)',
      'Bundesrechnungshof',
      'Statistisches Bundesamt (VGR Staat / Funktionen)',
      'IMK / IW (Investitionsbedarf)',
    ],
    entdecktAm: '2026-06-05',
    radarQuelle: 'Nutzer-Feedback (Gespräche), kuratiert',
  },
];

const mutations = ideen.map((i) => ({
  createOrReplace: {
    _id: `idee.kurat.${i.slug}`,
    _type: 'idee',
    titel: i.titel,
    status: i.status ?? 'vorschlag',
    themenfeld: i.themenfeld,
    leitfrage: i.leitfrage,
    anlass: i.anlass,
    vizIdee: i.vizIdee,
    kandidatenQuellen: i.kandidatenQuellen,
    radarQuelle: i.radarQuelle ?? 'Kuratiert (GURT-Redaktion)',
    entdecktAm: i.entdecktAm ?? entdecktAm,
  },
}));

const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/mutate/${dataset}?returnIds=true`;
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify({ mutations }),
});

const json = await response.json();
if (!response.ok) {
  console.error(`Fehlgeschlagen (HTTP ${response.status}):`, JSON.stringify(json));
  process.exit(1);
}

console.log(`OK: ${(json.results ?? []).length} kuratierte Ideen in "${dataset}" (Projekt ${projectId}).`);
