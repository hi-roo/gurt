# 01 — Architektur

## Prinzip: saubere Schichtentrennung

Jede Schicht hat **eine** Verantwortung und kennt nur ihre direkten Nachbarn. Das hält das System
wartbar, testbar und erlaubt es, einzelne Teile auszutauschen, ohne das Ganze zu gefährden.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  OFFIZIELLE QUELLEN                                                         │
│  data.europa.eu · bundestag.de (DIP) · bundesregierung.de · Ministerien    │
└───────────────────────────────┬──────────────────────────────────────────┘
                                 │  fetch + Zod-Validierung + Provenienz
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  DATEN-SCHICHT            packages/data                                     │
│  Getypte Adapter, Normalisierung, ETL-Skripte → saubere Datensätze         │
└───────────────────────────────┬──────────────────────────────────────────┘
                                 │  importiert/kuratiert in
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  CONTENT-SCHICHT          apps/studio  (Sanity)                            │
│  Redaktion verknüpft Datensätze mit Beiträgen, Akteuren, Maßnahmen,        │
│  Positionen, Visualisierungs-Konfigs, Quellen                              │
└───────────────────────────────┬──────────────────────────────────────────┘
                                 │  GROQ über next-sanity (defineLive)
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  PRÄSENTATIONS-SCHICHT    apps/web  (Next.js 15)                           │
│  Routing, Portable-Text-Rendering, Visual Editing                         │
│     ├── Design ........ packages/ui            (Tokens, Primitive)          │
│     └── Visualisierung  packages/visualizations (Plot/D3-Inseln)           │
└──────────────────────────────────────────────────────────────────────────┘
```

## Schichten im Detail

| Schicht          | Package                   | Verantwortung                                              | Kennt …                |
| ---------------- | ------------------------- | --------------------------------------------------------- | ---------------------- |
| Daten            | `packages/data`           | Offizielle Quellen holen, validieren, normalisieren        | nur externe APIs       |
| Content          | `apps/studio`             | Strukturierte Inhalte, Redaktions-Workflow, Schemas        | `data` (Import)        |
| Präsentation     | `apps/web`                | Routing, Rendering, SEO, Visual Editing                    | `studio`-API, `ui`, `visualizations` |
| Design           | `packages/ui`             | Design-Tokens, Tailwind-Preset, Layout-Primitive           | nichts                 |
| Visualisierung   | `packages/visualizations` | Plot/D3-Komponenten, A11y-Fallbacks                        | `ui` (Tokens)          |
| Konfiguration    | `packages/config`         | Geteilte tsconfig/eslint/prettier                          | nichts                 |

## Abhängigkeitsregeln (erzwungen durch Konvention + ESLint)

- **Frontend fetcht nie direkt von externen APIs.** Daten gehen immer durch `packages/data`.
- **`packages/ui` und `packages/visualizations` sind framework-nah, aber app-unabhängig.** Sie
  importieren nichts aus `apps/*`.
- **`packages/visualizations` kennt das Content-Modell nicht.** Es bekommt reine Daten + Config als
  Props. Die Brücke (Sanity-`Visualisierung` → Komponente) liegt in `apps/web`.
- **Keine zirkulären Abhängigkeiten.** Turbo erzwingt die Build-Reihenfolge über `dependsOn: ["^build"]`.

## Paket-Namespace

Alle internen Packages tragen den Scope `@gurt/*`:
`@gurt/web`, `@gurt/studio`, `@gurt/ui`, `@gurt/visualizations`, `@gurt/data`, `@gurt/config`.

## Laufzeit / Deployment

- **`apps/web`** → Vercel (Next.js nativ). ISR/Caching für Performance.
- **`apps/studio`** → Sanity-Hosting (`sanity deploy`, kostenlos auf `*.sanity.studio`) **oder**
  eingebettet — wir wählen das separate Studio für klare Schichtentrennung.
- **`packages/data`-ETL** → on-demand / geplant (GitHub Action), schreibt Datensätze nach Sanity
  oder als versionierte Fixtures.

Begründung der zentralen Entscheidungen: siehe [adr/](adr/).
