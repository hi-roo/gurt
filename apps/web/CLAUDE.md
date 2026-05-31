# CLAUDE.md — Präsentations-Schicht (`@gurt/web`)

Next.js 15 (App Router). Referenz: [docs/01-architecture.md](../../docs/01-architecture.md).

## Verantwortung

- Routing, Rendering, SEO, Visual Editing. **Keine** Daten-Fetches von externen APIs (das macht
  `@gurt/data`), keine Chart-Logik (das macht `@gurt/visualizations`).

## Struktur

- `app/` — Routen: `/` (Beitragsliste), `/beitrag/[slug]` (Artikel), `api/draft-mode/*`.
- `sanity/` — Client (`client.ts`), Fetch-Helfer (`fetch.ts`), GROQ (`queries.ts`), Env (`env.ts`).
- `content/` — Typen, **Seed-Daten** (`seed.ts`) und das **Repository** (`repository.ts`).
- `components/` — `article-body` (Portable Text), `visualization-renderer` (Brücke CMS→Charts),
  Header/Footer.

## Seed-Modus (wichtig)

Solange `NEXT_PUBLIC_SANITY_PROJECT_ID` nicht gesetzt ist, liefert `content/repository.ts` lokale
Seed-Daten (das Energie-Beispiel). So läuft `pnpm dev`/`build` **ohne** Sanity-Projekt. Sobald die
Env-Variable gesetzt ist, wird automatisch live aus Sanity gelesen.

## Regeln

1. **Schichtgrenzen wahren.** Visualisierungen kommen aus `@gurt/visualizations`, der Look aus
   `@gurt/ui`. Die einzige Brücke Content→Chart ist `components/visualization-renderer.tsx`.
2. **GROQ zentral** in `sanity/queries.ts`; ändert sich das Schema, hier (und in `content/types.ts`)
   nachziehen.
3. **A11y & Statik:** Charts liefern Tabellen-Fallback; der Seed-Modus rendert vollständig statisch.

## Befehle

```bash
pnpm --filter @gurt/web dev        # http://localhost:3000
pnpm --filter @gurt/web build
pnpm --filter @gurt/web typecheck
```
