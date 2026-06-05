# CLAUDE.md — Daten-Schicht (`@gurt/data`)

Getypte Adapter & ETL für offizielle Quellen. Referenz:
[docs/04-data-sources.md](../../docs/04-data-sources.md), [docs/05-data-pipeline.md](../../docs/05-data-pipeline.md).

## Verantwortung

- **Adapter** (`src/sources/`): `genesis-destatis`, `bundestag-dip`, `data-europa`, `energy-charts`,
  `bundesregierung`, `abgeordnetenwatch` (namentliche Abstimmungen → Fraktions-Matrix, keyless/CC0).
- **Schemas** (`src/schemas/`): Zod-Validierung der Roh-Antworten an der Grenze.
- **Transform** (`src/transform/`): Normalisierung + Provenienz.
- **CLI** (`src/ingest.ts`): Ingestion-Jobs starten.

## Eiserne Regeln

1. **Kennt nur externe APIs.** Keine UI, kein Sanity-Schema, kein React.
2. **Validierung ist Pflicht.** Jede externe Antwort wird mit Zod geprüft (`parse*`-Funktionen),
   bevor sie weitergereicht wird.
3. **Provenienz reist mit.** Jeder `Datensatz` trägt `herausgeber`, `url`, `abgerufenAm`, `lizenz`.
4. **Kein Auto-Publish.** ETL erzeugt Daten/Entwürfe — Veröffentlichung ist redaktionell (docs/07).
5. **Pure Logik testbar halten.** Parsing/Transform von HTTP trennen (`parseDipResponse`,
   `parseRssItems`), damit Tests ohne Netz/Key laufen.

## Secrets

`DIP_API_KEY` und `GENESIS_API_TOKEN` aus `process.env` (siehe `.env.example`). Niemals committen.

## Befehle

```bash
pnpm --filter @gurt/data test     # Vitest (Fixtures, kein Netz)
pnpm --filter @gurt/data ingest -- --source=bundestag-dip --titel="Gaskraftwerk"
```
