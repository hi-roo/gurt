# ADR 0001 — Monorepo mit pnpm-Workspaces + Turborepo

- **Status:** akzeptiert
- **Datum:** 2026-05-31

## Kontext

Gurt besteht aus mehreren Schichten (Daten, Content, Präsentation, Design, Visualisierung), die Code
teilen und gemeinsam versioniert werden sollen — bei sauberer Trennung.

## Entscheidung

Ein **Monorepo** mit **pnpm-Workspaces** (Abhängigkeits-Management, effizienter Store) und
**Turborepo** (Task-Orchestrierung, Caching, korrekte Build-Reihenfolge über `dependsOn`).

## Begründung

- Geteilte Packages (`@gurt/ui`, `@gurt/data`) ohne Publish-Overhead.
- Atomare Änderungen über Schichten hinweg in einem Commit.
- Turbo-Caching beschleunigt CI und lokale Builds.
- pnpm ist schnell, platzsparend und streng bei Phantom-Dependencies.

## Konsequenzen

- Einheitliche Tooling-Konfiguration nötig (`packages/config`).
- Build-Reihenfolge muss über `dependsOn: ["^build"]` korrekt deklariert sein.

## Alternativen

- **Polyrepo:** mehr Overhead, schwierige Querschnitts-Änderungen. Verworfen.
- **npm/yarn-Workspaces:** ok, aber pnpm + Turbo bietet bessere DX/Performance.
