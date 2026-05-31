# Seed-Daten

`energie.ndjson` enthält ein minimales, konsistentes Beispiel-Set (Thema, Akteure, Maßnahmen,
Quelle, Positionen) zum Energie-Leitbeispiel — als Startpunkt im echten Dataset.

> Hinweis: Alle Werte sind **illustrativ** (Demo). Reale Inhalte entstehen redaktionell aus
> offiziellen Quellen (siehe [docs/07](../../../docs/07-editorial-guidelines.md), [docs/08](../../../docs/08-methodology.md)).

## Import

Voraussetzung: Sanity-Projekt angelegt und `SANITY_STUDIO_PROJECT_ID`/`SANITY_STUDIO_DATASET` gesetzt.

```bash
pnpm --filter @gurt/studio seed
# entspricht: sanity dataset import seed/energie.ndjson production --replace
```

`--replace` macht den Import idempotent (gleiche `_id` wird überschrieben).
