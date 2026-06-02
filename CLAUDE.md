# CLAUDE.md — Root-Direktive für Gurt

Diese Datei steuert, wie Claude Code (und Menschen) in diesem Repository arbeiten. Sie ist die
oberste Direktive. Jede Schicht hat zusätzlich eine eigene, spezifischere `CLAUDE.md`.

## Was ist Gurt?

Gurt ([gurt.info](https://gurt.info)) ist eine **gemeinnützige Daten-Journalismus-Plattform**.
Sie erklärt politische Leitlinien (DE/EU) durch interaktive Datenvisualisierung und ordnet sie
**kritisch, aber strikt nicht-propagandistisch** ein. Lies vor inhaltlicher Arbeit:
- [docs/00-overview.md](docs/00-overview.md) — Mission & Werte
- [docs/07-editorial-guidelines.md](docs/07-editorial-guidelines.md) — redaktionelle Integrität
- [docs/08-methodology.md](docs/08-methodology.md) — Quellenpflicht & Transparenz

## Architektur in einem Satz

Monorepo (pnpm + Turborepo) mit klar getrennten Schichten: **Daten** (`packages/data`) →
**Content** (`apps/studio`, Sanity) → **Präsentation** (`apps/web`, Next.js) — mit gemeinsamem
**Design** (`packages/ui`) und **Visualisierung** (`packages/visualizations`).
Details: [docs/01-architecture.md](docs/01-architecture.md).

## Goldene Regeln

1. **Schichten respektieren.** Keine Layer-Verletzungen. `apps/web` rendert nur, was aus Sanity
   kommt; Daten werden in `packages/data` geholt/validiert, nie direkt im Frontend gefetcht.
   Visualisierungen leben in `packages/visualizations`, nie inline im Artikel-Renderer.
2. **Jede Zahl hat eine Quelle.** Kein Datenpunkt ohne Provenienz (`Quelle`-Entität). Siehe Methodik.
3. **Neutralität ist strukturell.** Mehrere Dinge können gleichzeitig richtig sein — das Content-Modell
   (`Maßnahme`, `Position`) bildet das ab. Keine wertende Sprache im Code, in Captions oder Defaults.
4. **Barrierefreiheit ist Pflicht, kein Extra.** Jede Visualisierung braucht Text-/Tabellen-Fallback,
   `aria`-Auszeichnung und respektiert `prefers-reduced-motion`. Siehe [docs/06](docs/06-visualization-guidelines.md).
5. **Keine Secrets committen.** Nur `.env.example` mit Platzhaltern. Echte Keys in `.env.local`.
6. **Direktiven aktuell halten.** Änderst du Architektur/Modell/Design grundlegend, aktualisiere die
   zugehörige `docs/*.md` und ggf. einen ADR in `docs/adr/`.

## Konventionen

- **Sprache:** UI & Inhalte auf **Deutsch**. Code, Bezeichner, Commits & Doku-Fließtext gemischt
  DE/EN ok; Schema-/Typnamen orientieren sich an der Domäne (z. B. `beitrag`, `massnahme`, `quelle`).
- **TypeScript strict** überall. Externe Daten an der Grenze mit **Zod** validieren.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:` …), kurz & präsent.
- **Formatierung:** Prettier + ESLint entscheiden — nicht von Hand streiten.

## Häufige Befehle

```bash
pnpm install        # Abhängigkeiten
pnpm dev            # Web (3000) + Studio (3333)
pnpm build          # alles bauen
pnpm lint           # ESLint
pnpm typecheck      # TypeScript
pnpm test           # Vitest
```

Einzelnes Package: `pnpm --filter @gurt/web dev` bzw. `--filter @gurt/studio …`.

## Wo finde ich was?

| Ich will …                         | … dann hierhin                                |
| ---------------------------------- | --------------------------------------------- |
| ein Content-Feld ändern            | `apps/studio/schemas/` + `docs/02-content-model.md` |
| eine neue Visualisierung           | `packages/visualizations/src/` + `docs/06`    |
| Farben/Typo/Abstände               | `packages/ui/src/` + `docs/03-design-system.md` |
| eine neue Datenquelle anbinden     | `packages/data/src/` + `docs/04-data-sources.md` |
| eine Seite/Route                   | `apps/web/app/`                               |
| GROQ-Abfragen                      | `apps/web/sanity/queries.ts`                  |
