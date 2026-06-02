---
name: gurt-visualisierung
description: >-
  Playbook für Datenvisualisierung bei GURT. Nutze es, wenn du einen Chart für
  einen Beitrag auswählst/baust, eine Visualisierung in `packages/visualizations`
  anlegst/änderst oder einen neuen Chart-Typ einführst. Kodifiziert Chart-Vokabular,
  Komponenten-Konventionen (Logik+Test, SSR, Tokens, A11y), die Content→Chart-Brücke
  und typische Fallstricke (siehe docs/06, docs/10 §4).
---

# GURT — Datenvisualisierung

**Leitlinie:** „Weniger Balken, mehr kontextualisierende Typen." Farbe ist **nie**
alleiniger Bedeutungsträger; jede Viz hat **Label + Tabellen-Fallback** (A11y, docs/06).

## 1. Charttyp nach Erzähl-Absicht (vorhandene Typen)
- **Anteil am Ganzen:** `waffle` (100 Kacheln) · `treemap` (Fläche = Größe).
- **Verhältnis greifbar:** `verhaeltnis` (Icon-Array, **feste Basis 100**, anteilig eingefärbt
  → Jahre/Fälle direkt vergleichbar; nie unterschiedliche Gesamtzahlen).
- **Flüsse:** `sankey`. **Zeitverlauf:** `linie` (Observable Plot, optional mehrere `serieFeld`-Reihen).
- **Beziehungen/Haltungen:** `position-matrix` (Stance bewusst **nicht** rot/grün).
- **Rangfolge (Notnagel):** `balken` — nur eingeordnet.
- Marken-Poster/Share: `SignaturePoster` (Quadrat) + `app/**/opengraph-image.tsx`.

## 2. Komponenten-Konventionen (`packages/visualizations`)
- **Reine Layout-Logik** in `<name>.ts` + Vitest `<name>.test.ts` (getestet wird Logik, **nicht**
  Rendering). Das **Rendering** in `<name>-chart.tsx`.
- **SSR-sicher:** Default sind Server-Komponenten aus reinem SVG/CSS (Waffle/Treemap/Sankey/
  Matrix/RatioArray). Observable-Plot-Charts (`LineChart`) sind client-only (`'use client'`,
  `useResize`+`useMounted`) mit `DataTable` als SSR-Fallback.
- **Farben nur aus `@gurt/ui/tokens`** (Palette „GURT Vibrant", `dataPalette`/`brandGradient`) —
  nie hardcoden. Text-auf-Fläche via Luminanz (`readableInk`). Kontrast AA prüfen. Farben rein
  kategorial nach Index, **nie an Parteien/Lager** koppeln.
- **A11y:** `role="img"`+`aria-label`; Tabellen-Fallback in `<details>`; `prefers-reduced-motion`
  global. Breite SVGs in `overflow-x-auto` mit `min-w-[…]` (mobil scrollbar statt unleserlich).
- **Look:** flach — keine Rahmen/Border-Radien an Schaubildern/Info-Boxen (scharfe Ecken).

## 3. Content → Chart (die einzige Brücke)
`apps/web/components/visualization-renderer.tsx` mappt `visualisierung.typ` auf die Komponente.
`encoding` trägt die Feldnamen: `xFeld`/`yFeld`/`kategorieFeld`/`serieFeld` (für `verhaeltnis`
zusätzlich als Labels: `kategorieFeld`=Basis-Label, `serieFeld`=Hervorhebungs-Label). Daten
kommen aus `datensatz.daten` (Seed) bzw. `datenJson` (Sanity, in `repository.ts` hydriert).

## 4. Neuen Chart-Typ hinzufügen (Reihenfolge)
1. Logik `<name>.ts` + Test · 2. `<name>-chart.tsx` · 3. Export in `packages/visualizations/src/index.ts`
· 4. Schema-Enum `apps/studio/schemas/documents/visualisierung.ts` (`typ`) · 5. Typ-Union in
`apps/web/content/types.ts` · 6. `case` im Renderer (+ `TYP_LABEL`) · 7. Seed mit `encoding`.
Danach Gates + Browser; bei Anteil-am-Ganzen den Stil-Guide §4 (docs/10) nachziehen.

## 5. Fallstricke
- **Dev vs. Build:** NICHT `pnpm --filter @gurt/web build` laufen lassen, während der Preview-
  Dev-Server läuft → korruptes `apps/web/.next` („Cannot find module ./vendor-chunks/…"). Fix:
  Dev stoppen, `rm -rf apps/web/.next`, neu starten. Gate lieber via typecheck/lint/test.
- **Plot-Breite im Headless-Preview** zeigt manchmal 15 px (useResize-Timing) → Reload; auf der
  echten Seite korrekt. Selektor-Evals auf Plot-SVGs sind unzuverlässig → per Screenshot prüfen.
