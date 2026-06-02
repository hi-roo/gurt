# 10 — Stil- & Storytelling-Guide

Wie Gurt erzählt — Stimme, redaktionelle Haltung, visuelles Vokabular. Ergänzt
[03-design-system](03-design-system.md), [06-visualization-guidelines](06-visualization-guidelines.md)
und [07-editorial-guidelines](07-editorial-guidelines.md). Maßstab ist der Energie-Leuchtturm
(`/beitrag/energie-mehrere-wege`).

## 1. Stimme & Haltung

Gurt verbindet **öffentliches Zukunftsdenken** mit **wirtschaftsjournalistischer Klarheit** —
zwei Pole, die sich ergänzen:

- **Souverän wie eine öffentliche Institution** (Referenz: [EU Digital Strategy](https://digital-strategy.ec.europa.eu/en)).
  Ruhig, präzise, transparent, zurückhaltend. Wir behaupten nicht, wir belegen. Wir werten nicht, wir ordnen ein.
- **Neugierig wie ein Wirtschaftsmagazin** (Referenz: *Brand Eins*). Gute Leitfragen, anschauliche
  Beispiele, ein roter Faden, der trägt — ohne Effekthascherei.

| Tu das | Vermeide |
| --- | --- |
| Mit einer Leitfrage öffnen | Mit einer These öffnen |
| „Mehrere Dinge können gleichzeitig richtig sein" | „X ist richtig, Y ist falsch" |
| Zahlen + Zitate direkt bequellen | Behauptungen ohne Beleg |
| Datenqualität offen ausweisen | Scheingenauigkeit, geglättete Widersprüche |
| Spektrum des Diskurses zeigen | Eine Seite stellvertretend sprechen lassen |

## 2. Redaktionelle Prinzipien

1. **Neutralität ist strukturell.** Maßnahmen tragen Pro **und** Contra; Positionen werden explizit
   gemacht. Kein einseitiges Framing.
2. **Diskurs abbilden, nicht ersetzen.** Wo eine Debatte läuft, nennen wir die Bandbreite —
   **Leitmedien und Akteure gleichwertig** über das Spektrum hinweg, jeweils belegt. Keine
   stellvertretende Wertung.
3. **Quellenpflicht — direkt am Ort.** Jede Zahl und **jedes Zitat** trägt seine Quelle dort, wo es
   steht (nicht nur in einer Sammelnote). In der **Positions-Matrix** ist die Quelle pro Aussage Pflicht.
4. **Datenqualität transparent.** Abweichende Metriken/Abgrenzungen werden benannt (siehe Energie-
   Methodik: öffentl. Nettoerzeugung ≠ eingespeist ≠ brutto).
5. **Keine erfundenen Zitate.** Positionen werden paraphrasiert + bequellt, sofern kein wörtliches
   Primärzitat vorliegt.

## 3. Storytelling-Bauplan (aus dem Energie-Stück)

```
Leitfrage  →  Kontext  →  kontextualisierende Visualisierung  →  Positionen (je bequellt)
           →  Diskurs/Vergleich (kontextreich, balanciert)     →  Methodik & Quellen
```

**Kontextarme Bausteine vermeiden.** Negativbeispiel (zu dünn):

> **Zwei Maßnahmen im Vergleich** · Maßnahme A: Neue Gaskraftwerke · Maßnahme B: Ausbau Erneuerbare

Stattdessen je Seite: **was, wofür, wer profitiert, welcher Trade-off** — und ein **Diskurs-Element**,
das die gesellschaftliche Debatte abbildet (Leitmedien quer durchs Spektrum, belegt, ohne Schlagseite).

## 4. Visualisierungs-Vokabular (Chart-Taxonomie)

**Prinzip:** kontextualisierende Diagramme bevorzugen — Typen, die auch **field-dependent** denkende
Leser:innen mitnehmen (Form + Kontext statt nackter Achsen). **Balkendiagramme sparsam einsetzen**;
wo Balken, dann eingeordnet (Beschriftung, Bezug, Anteil am Ganzen).

Auswahl nach **Erzähl-Absicht** (✓ = vorhanden, ◷ = geplant, siehe Roadmap):

| Absicht | Bevorzugte Typen |
| --- | --- |
| Anteil am Ganzen | **Waffle/Icon-Array ✓** · **Treemap ✓** · Sunburst ◷ · Semicircle-Donut ◷ *(statt Balken)* |
| Flüsse & Umverteilung | **Sankey ✓** · Chord ◷ · **Stream-Graph ✓** |
| Beziehungen / Netzwerke | Network ◷ · Arc-Diagramm ◷ · Flowchart ◷ · **Positions-Matrix ✓** |
| Verhältnis greifbar machen | **Verhältnis-Icon-Array ✓** (N je 100, Personen-Icons) · Pictogram ◷ |
| Verteilung / Streuung | **Beeswarm ✓** · Barcode ◷ · 1D-Heatmap ◷ · Contour ◷ |
| Zeitverlauf | **Area ✓** · **Stream-Graph ✓** · **Linie ✓** · Gantt ◷ |
| Hierarchie | **Treemap ✓** / Circular-Treemap ◷ · Dendrogram ◷ · Sunburst ◷ |
| Stufen / Mengen | Funnel ◷ · Pyramid ◷ · Circular-Gauge ◷ |
| Mengen-Überschneidung | Euler/Venn ◷ |
| Geografie | Geographic-Heatmap ◷ · Tile-Map ◷ |
| Rangfolge (Notnagel) | **Balken ✓** — nur eingeordnet |

**Pflicht je Visualisierung:** Text-Alternative/Beschreibung, **Tabellen-Fallback**, deutsche Zahlen,
Quellen-Zeile, `prefers-reduced-motion` respektiert. Farben **ausschließlich** aus der Palette
„GURT Vibrant" in `@gurt/ui/tokens` (vibrierend, kontraststark, AA) — **keine parteipolitischen
Default-Farben**; Farbe nie allein bedeutungstragend (Label/Tabelle Pflicht).

**Roadmap der Erweiterung** (in `packages/visualizations`), Reihenfolge nach Nutzen:
1. ✓ **Waffle/Icon-Array** + **Treemap** (Anteile am Ganzen → ersetzt den Strommix-Balken).
2. ✓ **Sankey** + **Stream/Area** (Flüsse & Zeit). *Sankey + gestapelte Fläche/Stream erledigt (Energie-Beitrag: EE/Fossile-Komposition über Zeit).*
3. **Beeswarm ✓** + **Chord/Network ◷** (Verteilung & Beziehungen). *Beeswarm erledigt (Verteidigung: NATO-%BIP je Mitglied, Deutschland hervorgehoben); Chord/Network offen.*
Jeder neue Typ: SVG/Observable-Plot oder D3, mit Tabellen-Fallback + Token-Farben.

## 5. Komponenten-Konventionen

- **Positions-Matrix:** Haltung als Farbe (neutral), Aussage paraphrasiert, **Quelle direkt an jeder
  Aussage** (Titel + Link); darunter eine Belege-Liste. Nie ohne Quelle.
- **Captions** beschreiben Aussage **und** Quelle/Stand. **Annotationen** statt Legenden-Raterei.
- **Vergleich/Diskurs** trägt Kontext je Seite + ein belegtes Diskurs-Element (Leitmedien-Spektrum).

## 6. Anti-Patterns

- Kontextarme Vergleichskacheln (nur Labels, kein Inhalt).
- Nackte Balken ohne Einordnung; Balken, wo ein Anteil-am-Ganzen-Typ klarer wäre.
- Unbequellte Zitate oder Zahlen; Zitat ohne direkte Quelle.
- Einseitiges Framing — nur eine Seite des Diskurses, oder Leitmedien selektiv.
- Scheingenauigkeit: Widersprüche glätten statt sie als Datenqualitäts-Note auszuweisen.
