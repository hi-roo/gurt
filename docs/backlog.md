# Backlog

Ergänzung zur [Roadmap](roadmap.md). Während die Roadmap **Phasen & Richtung** beschreibt, hält
dieses Backlog **konkrete, priorisierte Arbeitspakete** mit stabiler ID, Wertbeitrag, Definition of
Done (DoD) und Datenquellen. Lebendiges Dokument — Reihenfolge ≈ Priorität.

**Horizonte:** 🟢 Jetzt (startklar, als Nächstes) · 🔵 Bald · ⚪ Später / über 80 % hinaus.

**ID-Präfixe:** `VIZ` Visualisierung · `ED` redaktionelle Bausteine · `ART` Beiträge ·
`UX` Routing/A11y/Mobile · `CAP` Plattform-Fähigkeiten · `OPS` Deploy/SEO/Infra.

**Maßstab pro Beitrag** (vereinbart): klare Leitfrage · ≥ 1 echte interaktive Viz · kartierte &
bequellte Positionen · Methodik-Note · neutrale Sprache. Stil siehe
[docs/10-style-storytelling.md](10-style-storytelling.md).

---

## 🟢 Jetzt — nächste Blöcke Richtung „80 %"

> Die drei „Jetzt"-Infrastruktur-Blöcke (VIZ-1, ED-1, UX-1) sind **erledigt** (siehe unten). Damit
> stehen Chart-Vokabular, Diskurs-Baustein und A11y-/Mobile-Baseline — der nächste Fokus sind die
> **vier weiteren Benchmark-Beiträge** (🔵 Bald), um „5 Beiträge" zu erreichen.

---

## ✅ „80 %"-Meilenstein erreicht (2026-06-02)

> **5 von 5** Benchmark-Beiträgen live: Energie (#1), Verteidigung (#2), Migration (#3), Wohnen (#4),
> Rente (#5) — alle mit echter, bequellter Datenbasis, Diskurs-Block, Methodik und neutraler Sprache.
> Zusammen mit Stil-/Storytelling-Guide, vibrierender Marke und A11y/Mobile-Baseline ist das vom User
> definierte „80 %"-Ziel erfüllt. **Nächste Phase:** Domain **`gurt.info`** ist in Vercel registriert
> (Nameserver-Propagation läuft) — danach live; dann die ⚪-Blöcke (Themen-Radar, Skill-Aufbau).
> Benchmark #6 (Klima als Querschnitt) **erledigt** — als erste vollständig durch den Themen-Radar
> angestoßene Idee (Signal → Brief → Beitrag → Idee „umgesetzt"). Siehe unten.

---

## ⚪ Später — über „80 %" hinaus

### OPS-1 · Launch-Paket
Domain `gurt.info` ist live (Vercel „Valid Configuration"). SEO-Launch-Politur **erledigt** (siehe unten).
Offen (Dashboard, User): `NEXT_PUBLIC_SITE_URL=https://gurt.info` als Vercel-Production-Env setzen + redeploy; Adobe-Fonts-Kit `nkg1woj` für `gurt.info` freigeben; Studio produktiv final.

### VIZ-2 · Chart-Vokabular Welle 2
**Stream/Area ✓ + Beeswarm ✓ erledigt** (siehe unten). Offen: **Chord/Network** (Beziehungen)
sowie optional Stufen/Funnel, Geo — nach Bedarf der Beiträge.

### UX-2 · Marginalien-Spalte (Randnotizen)
**Wert:** Kontext am Seitenrand des Beitrags, ohne den Lesefluss zu stören — macht GURT zur
Einstiegs- *und* Vertiefungsfläche. **Aus Nutzer-Feedback (2026-06).**
**Inhalte je Beitrag:** Häufigkeit der Themen-Nennung in den Leitmedien (Medien-Resonanz) ·
weiterführende Links/Quellen · RSS-Abo · kuratierte „Nachrichten · Debatten · Hintergründe".
**Skizze:** eigene Randspalte (Desktop) / einklappbar (Mobile); A11y als ergänzende Landmark,
nicht im Hauptlesefluss; Farbe nie alleiniger Bedeutungsträger. Die **Medien-Resonanz** braucht
eine Datenquelle (News-/Presse-API oder GDELT) → eigener Adapter in `packages/data`.
**DoD:** Komponente + Content-Feld(er) im `beitrag`-Schema + ≥ 1 Resonanz-Datenquelle + A11y/Mobile.

### ART-11 · Transparenz-Case-Study: Wie GURT mit KI gemacht wird
**Wert:** GURTs Glaubwürdigkeit lebt von Offenheit (docs/07, docs/08). Eine ehrliche Case Study, *wie*
KI in der Produktion eingesetzt wird — und wo der Mensch entscheidet —, macht den Prozess transparent
und ist zugleich ein Alleinstellungsmerkmal. **Aus Nutzer-Wunsch (2026-06).**
**Inhalt (Einblicke je Schicht):** technologische Schicht (Monorepo, Sanity, Next.js, Viz-Pipeline) ·
Redaktion & Storytelling (Skills `gurt-quellen`/`gurt-storytelling`, Prüfstraße `gurt-review`) ·
Charts (`gurt-visualisierung`, A11y) · Data Pipeline (`packages/data`, Ingestion, Zod/Provenienz) ·
Themen-Radar (`idee`-Briefs, GitHub-Action) · Quellen-/Faktencheck (deep-research, 3-Stimmen-Verifikation).
**Haltung:** klar trennen, was KI *vorbereitet*, von dem, was Menschen *verantworten und freigeben* —
keine Übertreibung des Automatisierungsgrades.
**DoD:** Transparenz-Seite/Beitrag (verlinkt aus /ueber + /methodik), neutral & belegt, mit konkreten
Beispielen aus dem Repo; ehrliche Abgrenzung automatisch ↔ kuratiert; ggf. Verweis in docs/08.

### Weitere (aus Roadmap Phase 2/3)
Volltextsuche · Akteurs-Profile · einbettbare Vizs · Mehrsprachigkeit (EN) · Daten-Downloads/API ·
externes A11y-Audit.

---

## Erledigt (jüngste)

- **UX-5/UX-6 · Tabellen-Fallback-Politur** — letzte `tbody`-Zeile ohne untere Trennlinie
  (`last:border-b-0` im `DataTable`); Spaltenköpfe vereinheitlicht: fehlt ein `label` (UX-3),
  kapitalisiert der `visualization-renderer` den Feldschlüssel (erster Buchstabe groß → „Jahr“/
  „Reihe“/„Wert“ statt roh). Konvention in docs/06 notiert. Gates + Browser grün.
- **UX-3 · Sprechende Tabellen-Header** — der `DataTable`-Fallback zeigte die rohen Feldnamen als
  Spaltenköpfe. Systemisch gefixt: optionales `label` im `Spalte`-Typ (`content/types.ts`) und im
  Sanity-Schema (`datensatz.spalten`); der `visualization-renderer` nutzt `spalte.label ?? spalte.name`
  (Fallback unverändert). Exemplarisch gepflegt: der Subventionen-Beitrag (Bereich/Einzelposten/Betrag).
  docs/02 nachgezogen, Gates grün.
- **DATA-1 · GovData.de geprüft** — CKAN-API (`package_search`, keyless, JSON), DCAT-Katalog als RDF.
  Beispiel-Abruf bestätigt (`q=haushalt` → 1.917 Treffer; bei Kommunen CC-BY + CSV). Lizenzen gemischt
  und uneinheitlich gepflegt → pro Datensatz prüfen; Abdeckung breit, aber v. a. kommunal/regional.
  **Empfehlung:** vorerst kein voller Adapter — als Discovery-Werkzeug nutzen, dann beim Original-
  Herausgeber abrufen; bei kommunalem/regionalem Bedarf ein schlanker `govdata`-CKAN-Adapter. Bewertung
  in docs/04.
- **VIZ-4 · Bürgergeld-Regelsatz nominal vs. inflationsbereinigt** — die Zwei-Linien-Viz
  (`regelsatzLinie`) im Bürgergeld-Beitrag bestand bereits (Regelsatz 449→563 € vs. gestrichelte
  „Kaufkraft von 2022“-Linie 449→507 €, mit dem VPI fortgeschrieben, 2026-Prognose). Offen war der
  **Kaufkraft-Kontext**: jetzt eine laienverständliche Erklärung direkt am Diagramm (was die
  gestrichelte Linie bedeutet, was der Abstand aussagt) plus zwei Neutralitäts-Caveats — gesetzlicher
  Mischindex statt VPI, und höhere Inflation für einkommensschwache Haushalte (IMK-Inflationsmonitor,
  Hans-Böckler-Stiftung). Methodik um den Rechenweg (Destatis-VPI-Jahresdurchschnitte; 2026 ≈ 2,2 %
  nach Bundesbank) + Quellen ergänzt. Gates grün.
- **UX-4 · Modale Suche (Command-Palette)** — die Volltextsuche (SEARCH-1) zusätzlich als modales
  Overlay von jeder Seite: Header-Lupe + **⌘/Strg-K** (global, toggelt). Live-gerankte Treffer aus
  geteilter Logik (`content/search.ts` + `search-highlight.tsx`, keine zweite Implementierung),
  Tastatur-Navigation (↑/↓/Enter), A11y nach Combobox-Muster (`role=dialog`/`aria-modal`, Fokus-Falle
  + Fokus-Rückgabe, `aria-expanded`/`-controls`/`-activedescendant`, Body-Scroll-Lock). Der Index wird
  beim ersten Öffnen lazy über `api/search-index` geladen (nicht auf jeder Seite mitgeschickt);
  Footer „Alle Treffer“ → `/suche?q=…`. Der Header-Trigger ersetzt den alten `/suche`-Link. Gates +
  Browser grün.
- **VIZ-2 · Chart-Vokabular Welle 2 (Stream/Area + Beeswarm)** — zwei neue Plot-Komponenten:
  `AreaChart` (gestapelte Fläche, `offset:'wiggle'` = Stream-Graph) und `BeeswarmChart`
  (Verteilung, `dodgeY`, mit `highlight` + Referenzlinie `refWert`/`refLabel`). Vollständig
  verdrahtet: Export → Schema-Enum (`flaeche` echt, neu `beeswarm`; Encoding um `highlight`/`refWert`/
  `refLabel` erweitert) → `content/types.ts` → Renderer (`flaeche`→AreaChart statt LineChart, neuer
  `beeswarm`-Case) → Seed. Angewandt: **Energie** — gestapelte Fläche EE/Fossile 2015–2024 (Summe
  sinkt ~450→402 TWh, grünes Band verdrängt graues); **Verteidigung** — Beeswarm NATO-%BIP je
  Mitglied 2024 (31 Länder, Deutschland bei 2,0 % hervorgehoben, 2-%-Richtwertlinie; Quelle: NATO
  „Defence Expenditure 2014–2025", Tab. 3). Gates grün, Sanity re-importiert (20 Visualisierungen),
  Stil-Guide §4 + Skill + CLAUDE.md nachgezogen. Offen aus Welle 2: Chord/Network.
- **ART-6 · Benchmark #6 „Klima" (`treibhausgase-und-klimaziele`)** — erste vollständig vom
  Themen-Radar angestoßene Idee, end-to-end geschlossen: DIP-Signal („Klimaschutz") → `idee`-Brief
  (Leitfrage „Wo steht Deutschland bei den Klimazielen — und in welchen Sektoren hakt es?") →
  veröffentlichter Beitrag → `idee`-Status „umgesetzt" (Sanity). Inhalt: Linie der
  Treibhausgasemissionen 1990→2024 (1.252 → 649 Mt, −48 %) gegen die gesetzlichen Zielmarken
  (−65 %/2030 ≈ 438 Mt, −88 %/2040 ≈ 150 Mt, Neutralität 2045) + Treemap der 2024er-Sektoren
  (Energiewirtschaft 185 · Industrie 153 · Verkehr 143,1 · Gebäude 100,5 · Landwirtschaft 62,1 ·
  Abfall 5,4 = 649 Mt, ohne LULUCF) + ausgewogener Diskurs (UBA · Expertenrat für Klimafragen ·
  Agora · DIHK/Wirtschaft · Deutsche Umwelthilfe). Quellen: UBA (finale Daten 2024), ERK-Prüfbericht
  2025. Kernbefund neutral: −48 % geschafft, Dekadenbudget 2021–2030 voraussichtlich gehalten — aber
  fast nur durch den Stromsektor; Verkehr/Gebäude verfehlen ihre Beiträge, 2040/2045 außer Reichweite.
- **CAP-1 · Themen-Radar (v1, signal-getrieben)** — redaktionelle Pipeline: neuer Sanity-Doc-Typ
  `idee` (Beitrags-Brief) + `scripts/themen-radar.ts` (zieht aktuelle Bundestag-DIP-Vorgänge zu 8
  Themenfeldern, baut strukturierte Briefs mit Leitfrage/Anlass/Kandidaten-Quellen/Viz-Idee,
  idempotent via `createIfNotExists`) + GitHub-Action `themen-radar.yml` (wöchentlich + manuell).
  Verifiziert: 16 `idee`-Vorschläge live in Sanity (Status „vorschlag", kein Auto-Publish; Frontend
  rendert sie nicht). `pnpm radar:topics` (`-- --dry` = Vorschau). Erweiterbar (weitere Signalquellen,
  optionaler LLM-Veredelungsschritt). Doku: docs/05.
- **CAP-2 · Skill-Aufbau** — drei wiederverwendbare Projekt-Skills unter `.claude/skills/`:
  `gurt-quellen` (Quellenhierarchie, PDF-/Extraktions-Tricks, Neutralität, Zitierschema),
  `gurt-visualisierung` (Chart-Vokabular, Komponenten-Konventionen, Renderer-Brücke, neuen Typ
  hinzufügen, Pitfalls) und `gurt-storytelling` (Stimme, Benchmark-DoD, Artikel-Bauplan,
  Diskurs-Block, Seed→Sanity-Workflow, Commit/Push-Regeln). Auto-Trigger via Description; in
  `CLAUDE.md` verlinkt. Kodifiziert die Playbooks der fünf Benchmark-Beiträge.
- **OPS-1 · Launch-Politur (SEO)** — `app/sitemap.ts` (Beiträge/Themen/statisch, 18 URLs),
  `app/robots.ts` (Sitemap-Verweis, `/poster` + `/api` noindex), `app/feed.xml` (RSS 2.0, 7 Items),
  vollständige OpenGraph-/Twitter-Metadaten (Root + je Beitrag `og:type=article`, Canonical,
  publishedTime/Autoren), Standard-OG-Bild der Seite + JSON-LD (`Article`) je Beitrag. Gemeinsame
  `SITE_URL`-Konstante (Default `https://gurt.info`). Domain gurt.info ist live.
- **Domain → gurt.info** — Code/Direktiven von gurt.report umgestellt (Metadaten, OG, README, CLAUDE.md,
  LICENSE, package.json); Bindestrich-Infra (Vercel-Subdomain, Sanity-studioHost) unverändert.
- **ART-5 · Rente & private Altersvorsorge** — Benchmark-Beitrag #5 (`rente-und-ihre-annahmen`), live
  aus Sanity. **Damit 5/5 → „80 %"-Meilenstein.** Echte Daten: Linie Altenquotient 2020–2060 (Destatis
  15. koord. Bevölkerungsvorausberechnung; steigt auf 43,4/2040, dann Plateau) und 2-Reihen-Linie
  Rentenniveau & Beitragssatz bis 2039 (Rentenversicherungsbericht 2025: Niveau 48 % bis 2031 → 46,3 %,
  Beitrag 18,6 → 21,2 %). Diskurs-Block (Bundesregierung/Rentenpaket, DRV, IW, VdK). Neue Rubrik „Rente".
- **ART-4 · Wohnen / Bauen / Mieten** — Benchmark-Beitrag #4 (`wohnen-bauen-und-mieten`), live aus
  Sanity. Echte Destatis-Daten: Doppel-Linie Genehmigungen vs. Fertigstellungen 2022–2025 (die
  „Schere": Genehmigungen erholen sich 2025, Fertigstellungen fallen mit Verzug weiter auf 206.600 —
  alle weit unter dem 400.000-Ziel) und Treemap Fertigstellungen 2024 nach Gebäudetyp. Diskurs-Block
  (Bundesregierung/Bau-Turbo, ZDB/Bauüberhang 760k, Mieterbund, Städtetag). Methodik mit Abgrenzung
  genehmigt ≠ gebaut. Neue Rubrik „Wohnen".
- **Matrix-Fix** — Positions-Matrix auf „GURT Vibrant" (nicht rot/grün) + Klick/Fokus statt Hover
  (Quellen-Link klickbar, kein Clipping, nativer Tooltip entfernt).
- **Brand · „GURT Vibrant" + Signatur-Poster** — vibrierendes Farbkonzept (Coolors/Referenz) als neue
  Daten-Palette + Marken-Verlauf + Magenta-Akzent (`#9e0059`, Kontrast 8:1); Direktiven angepasst,
  A11y-Schutz erhalten (Farbe nie alleiniger Träger, Tabellen-Fallback, Kontrast). PoC: `SignaturePoster`
  (Quadrat 1:1, Container-skaliert) unter `/poster/[slug]` und automatisches OG-/Share-Bild (1200×630,
  `next/og`) je Beitrag im Signatur-Look. Stance-Kodierung der Matrix bleibt bewusst nicht rot/grün.
- **ART-3 · Migration & Arbeitsmarkt** — Benchmark-Beitrag #3 (`migration-und-arbeitsmarkt`), live aus
  Sanity, strikt neutral. Treemap der zehn wichtigsten Herkunftsländer 2024 (Destatis; Ukraine → China)
  und Waffle der vier größten Zuwanderungsgründe von Drittstaatsangehörigen (BAMF; mit klarer
  EU-Freizügigkeits-Einordnung). Diskurs-Block mit fünf belegten Stimmen (IW, Bundesregierung/FKEG,
  IAB, ver.di, SVR). Methodik mit Erfassungs-Caveats; Erwerbs- und Fluchtmigration getrennt behandelt.
  Neue Rubriken „Migration" und „Arbeitsmarkt".
- **ART-2 · Verteidigung / Zeitenwende** — Benchmark-Beitrag #2 (`zeitenwende-in-zahlen`), live aus
  Sanity. Echte, bequellte Daten: Verteidigungsausgaben in % BIP 2014–2024 (NATO, Defence Expenditure
  of NATO Countries — Linie, 1,16 → 2,00 %) und Sondervermögen-Wirtschaftsplan 2022 nach Dimensionen
  (Treemap, 81,9 Mrd €). Diskurs-Block mit fünf ausgewogenen Stimmen (Pistorius/Bundesregierung, NATO,
  Bundesrechnungshof, Sachverständigenrat, Die Linke). Methodik mit NATO-Metrik-Abgrenzung. Neue
  Rubrik „Verteidigung" erscheint automatisch.
- **UX-1 · A11y- & Mobile-Politur** — Mobile-Audit (375 px) + Fixes: breite SVG-Charts (Sankey/Treemap)
  scrollen jetzt horizontal mit Mindestbreite (Labels lesbar statt ~5 px), Linechart overflow-sicher;
  Touch-Targets ≥ 44 px (Header-/Themen-Nav, Wortmarke) bzw. ≥ 24 px AA (Summary-Toggles, Breadcrumbs);
  globaler `summary`-Tap-Bereich; Fokus-Sichtbarkeit (global `:focus-visible` + Matrix-Zellen) und
  `prefers-reduced-motion` verifiziert; kein horizontaler Seiten-Overflow. Positions-Matrix war bereits
  scroll-fähig. Über alle Breakpoints (375/1280) gegengeprüft.
- **ED-1 · Diskurs-Block** — neuer `diskursBlock` (Schema + Typ + GROQ + barrierefreier Renderer als
  `role="list"`) ersetzt die dünne Vergleichskachel. Im Energie-Leuchtturm verankert mit fünf
  ausgewogenen, belegten Stimmen zur Kraftwerksstrategie (Stand Mai 2026: BMWE/Reiche, EU-Kommission,
  BDEW, Deutsche Umwelthilfe, bne; Quellen pv magazine & taz). Jede Sichtweise mit Quelle direkt
  (Guide §2). `vergleichBlock` vollständig entfernt; Sanity re-importiert.
- **VIZ-1 · Treemap + Sankey** — zwei kontextualisierende Typen, beide im Energie-Leuchtturm verankert
  mit echten AGEB-Daten (Jahresbericht 2023): Treemap = Primärenergieverbrauch nach Energieträgern
  (Strom ist nur ein Teil des Systems); Sankey = „Wohin fließt das Erdgas?" (nur ~13 % in die
  Stromversorgung). Reine Layout-Logik + 12 Tests, SVG-Rendering (SSR-sicher), Tabellen-Fallback.
- **VIZ-0 · Waffle-Diagramm** — ersetzt den Strommix-Balken (100 Kacheln, Largest-Remainder/Hamilton,
  Okabe-Ito, Tabellen-Fallback). Positions-Matrix ohne Layout-Bounce (fixe Detailhöhe), Belege ohne
  leere „–"-Felder. Commit `82b1e95`.
- **Stil-/Storytelling-Guide** — `docs/10-style-storytelling.md`; Positions-Matrix-Zitate mit Quelle
  direkt. Commit `6cc341b`.
- **Energie-Leuchtturm ECHT** — Strommix 2024 (Fraunhofer ISE) + Trend 2015–2024 + bequellte
  Positions-Matrix + Methodik. Commit `51bd1c2`.
- **UX-/Routing-Schale** — Themen-Hubs, Header-Nav, Breadcrumbs, verwandte Beiträge. Commit `1478343`.
