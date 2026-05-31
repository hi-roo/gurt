# 08 — Methodik & Transparenz

Transparenz ist Gurts Geschäftsgrundlage. Diese Seite beschreibt, wie wir arbeiten — öffentlich
nachvollziehbar.

## Daten-Herkunft

- Wir nutzen **offizielle / primäre Quellen** (siehe [04-data-sources.md](04-data-sources.md)).
- Jeder Datensatz trägt: **Herausgeber, Original-URL, Abrufdatum, Lizenz** und — falls transformiert —
  eine **Provenienz-Notiz**, was verändert wurde.
- Wo möglich, hinterlegen wir einen **Archiv-Snapshot** der Quelle.

## Von Rohdaten zur Grafik

1. **Extraktion** über getypte Adapter (`packages/data`).
2. **Validierung** mit Zod an der Systemgrenze.
3. **Transformation** dokumentiert (Einheiten, Aggregation, Filter).
4. **Redaktionelle Kuratierung** verknüpft Daten mit Kontext — im Vier-Augen-Prinzip.
5. **Visualisierung** nach den Regeln in [06](06-visualization-guidelines.md) (ehrliche Achsen,
   Unsicherheit sichtbar, A11y).

## Methodik-Hinweis pro Beitrag

Jeder Beitrag enthält einen Methodik-Hinweis (`beitrag.methodik`) mit mindestens:

- **Datenstand** (Zeitpunkt der Daten und letzter Aktualisierung).
- **Auswahl** (welche Daten/Akteure/Zeiträume — und warum).
- **Grenzen** (was die Daten **nicht** zeigen; bekannte Unsicherheiten).

## Korrektur-Policy

- Substanzielle Korrekturen werden **am Beitrag gekennzeichnet** (Was, Wann, Warum).
- Tippfehler/Stilkorrekturen ohne Bedeutungsänderung müssen nicht ausgewiesen werden.
- Korrektur-Hinweise bleiben dauerhaft sichtbar.

## Unabhängigkeit & Interessenkonflikte

- Finanzierung und Förderer werden offengelegt.
- Bei thematischen Interessenkonflikten erfolgt ein sichtbarer Hinweis.
- Keine Einflussnahme Dritter auf redaktionelle Auswahl oder Darstellung.

## Offenheit

- Quellcode ist offen (MIT). Inhalte sind nachnutzbar (CC BY 4.0).
- Methodische Kritik ist willkommen — Kontakt-/Hinweiswege werden auf der Plattform bereitgestellt.
