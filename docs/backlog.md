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

## 🔵 Bald — weitere Benchmark-Beiträge (Ziel: 5 gesamt)

> **3 von 5** Beiträgen erreicht: Energie (#1), Verteidigung/Zeitenwende (#2) und Migration &
> Arbeitsmarkt (#3). Zwei weitere bis „80 %". Quellen bevorzugt keyless (Eurostat, Destatis) +
> Primärdokumente (Bundestag-DIP, Ministerien).

### ART-4 · Wohnen / Miete
**Leitfrage-Idee:** Warum steigen Mieten schneller als der Bau hinterherkommt?
**Daten:** Destatis (Baufertigstellungen, Mietindex), Eurostat. **Viz-Idee:** Linie + annotierte
Schere; Treemap nach Gebäudetyp/Region.

### ART-5 · Rente & private Altersvorsorge
**Leitfrage-Idee:** Welche Annahmen tragen die Rente — und was, wenn sie kippen?
**Daten:** Rentenversicherung, Destatis-Demografie, Eurostat. **Viz-Idee:** Flächen/Szenarien.

> Klima–Gesellschaft–Wirtschaft ggf. als Querschnitt in andere Beiträge integriert statt eigener #6.

---

## ⚪ Später — über „80 %" hinaus

### CAP-1 · Redaktionelle Pipeline „Themen-Radar"
Routine, die Quellen beobachtet, Themen + Zusammenhänge erkennt und strukturierte **Beitrags-Briefs**
vorschlägt. Idee: `idee`/`brief`-Dokumenttyp in Sanity + GitHub-Action/Research-Workflow. Stehender
Dauer-Wunsch.

### CAP-2 · Systematischer Skill-Aufbau
Projekteigene, wiederverwendbare Skills für **Quellensuche · Datenvisualisierung · Storytelling**
(kodifizierte Playbooks + Gurt-Konventionen). Stehender Dauer-Wunsch.

### OPS-1 · Launch-Paket
Domain `gurt.report` verbinden (nach 80 %), SEO/Sitemap/OpenGraph/RSS, Studio produktiv final.

### VIZ-2 · Chart-Vokabular Welle 2
Stream/Area → Beeswarm → Chord (Guide §4-Fahrplan), je nach Bedarf der Beiträge ART-2…5.

### Weitere (aus Roadmap Phase 2/3)
Volltextsuche · Akteurs-Profile · einbettbare Vizs · Mehrsprachigkeit (EN) · Daten-Downloads/API ·
externes A11y-Audit.

---

## Erledigt (jüngste)

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
