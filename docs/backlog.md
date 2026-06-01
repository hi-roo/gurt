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

### ED-1 · Kontextreicher Diskurs-Block (ersetzt dünne Vergleichskachel)
**Wert:** Erfüllt direkt den Wunsch „Leitmedien ausgewogen nennen, Kontextarmut vermeiden". Ersetzt
das bemängelte „Maßnahme A / B" durch mehrere belegte Sichtweisen + Diskurs-Spektrum nebeneinander.
**DoD:** neuer Block-Typ (`diskursBlock`) in `apps/studio/schemas/objects/body.ts` + GROQ + Typ +
Renderer; jede Sichtweise mit Quelle direkt; ausgewogene Auswahl quer durchs Leitmedien-Spektrum
(keine einseitige Rahmung, Guide §2); A11y (Struktur als Liste, kein Farbe-allein).
**Abh.:** ersetzt `vergleichBlock` — Migration der Energie-Seite mitdenken.

### UX-1 · A11y- & Mobile-Politur
**Wert:** Teil des 80 %-Ziels (Orientierung + angenehme responsive Usability).
**DoD:** Touch-Targets ≥ 44 px; Charts auf kleinen Screens geprüft (Waffle/Matrix/Linie scrollen/
brechen sauber); Tastaturpfade & Fokus-Sichtbarkeit über alle interaktiven Vizs; Header-/Themen-Nav
mobil; `prefers-reduced-motion` global verifiziert; Kontraste AA.
**Abh.:** profitiert davon, nach VIZ-1/ED-1 zu laufen (mehr Komponenten zu prüfen).

---

## 🔵 Bald — weitere Benchmark-Beiträge (Ziel: 5 gesamt)

> Energie ist Leuchtturm #1 (live, Commit `51bd1c2`). Vier weitere bis „80 %". Quellen bevorzugt
> keyless (Eurostat, Destatis) + Primärdokumente (Bundestag-DIP, Ministerien).

### ART-2 · Verteidigung / Zeitenwende
**Leitfrage-Idee:** Wohin fließt das Sondervermögen, und was verschiebt sich strukturell?
**Daten:** Eurostat/NATO-Ausgaben, Bundeshaushalt/Einzelplan 14, DIP-Vorgänge. **Viz-Idee:** Sankey
(Mittelflüsse) oder Stream (Ausgaben über Zeit).

### ART-3 · Migration & Arbeitsmarkt
**Leitfrage-Idee:** Wie hängen Zuwanderung und Arbeitsmarkt-Lücken zusammen?
**Daten:** Destatis, BA-Statistik, Eurostat. **Viz-Idee:** Beeswarm/Verbund mehrerer Reihen.

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
