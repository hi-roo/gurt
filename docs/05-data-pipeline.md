# 05 — Daten-Pipeline (ETL)

Wie Daten von der offiziellen Quelle bis in einen veröffentlichten Beitrag kommen. Implementiert in
`packages/data`.

## Phasen

```
1. EXTRACT     Adapter holt Rohdaten aus offizieller Quelle (REST/SPARQL/RSS)
        │      → packages/data/src/sources/*
        ▼
2. VALIDATE    Zod-Schema prüft Struktur an der Grenze; ungültiges fliegt raus
        │      → packages/data/src/schemas/*
        ▼
3. TRANSFORM   Normalisieren: Einheiten, Spaltennamen, Zeitformate; Provenienz anhängen
        │      → packages/data/src/transform/*
        ▼
4. LOAD        Als `datensatz` nach Sanity schreiben ODER als versioniertes Fixture ablegen
        │      → packages/data/src/load/*  (Sanity-Write-Client / Datei)
        ▼
5. CURATE      Redaktion verknüpft Datensatz mit Beitrag/Visualisierung, prüft, gibt frei
               → apps/studio (manuell, mit Vier-Augen-Prinzip)
```

## Prinzipien

- **Validierung an der Grenze.** Nichts Unvalidiertes wandert tiefer ins System. Zod ist Pflicht.
- **Provenienz reist mit.** Jeder transformierte Datensatz trägt Quelle, Abrufdatum, Lizenz,
  Transformations-Notiz.
- **Idempotenz.** Erneutes Ausführen erzeugt denselben Zustand (Upsert per stabilem Key).
- **Kein Auto-Publish.** ETL erzeugt nur *Entwürfe*/Datensätze. Veröffentlichung ist redaktionell.
- **Reproduzierbarkeit.** Roh-Antworten optional als Snapshot ablegen, damit Transformationen
  nachvollziehbar bleiben.

## Ausführung

- Lokal: `pnpm --filter @gurt/data ingest -- --source=bundestag-dip --query=…`
- Automatisiert: GitHub Action (geplant, z. B. wöchentlich) ruft definierte Ingestion-Jobs auf.
- Secrets (`DIP_API_KEY`, Sanity-Write-Token) kommen aus der Umgebung, nie aus dem Code.

## Tests

- Jeder Adapter hat Unit-Tests gegen **Fixtures** (`packages/data/test/fixtures/`) — kein Live-Key
  nötig, CI bleibt grün und deterministisch.
- Transform-Funktionen sind reine Funktionen → leicht testbar.
