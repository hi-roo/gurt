# ADR 0002 — Sanity als CMS

- **Status:** akzeptiert
- **Datum:** 2026-05-31

## Kontext

Gurt braucht ein CMS, das strukturierte Inhalte fördert und die Einbettung von Datensätzen und
Visualisierungen direkt in redaktionelle Beiträge erlaubt.

## Entscheidung

**Sanity** als Content-Backend; das Studio liegt als eigene App (`apps/studio`).

## Begründung

- **Strukturierte Inhalte:** Schema-as-Code, perfekt für unser Domänen-Modell (`maßnahme`,
  `position`, `quelle` …).
- **Portable Text:** Rich-Text mit eingebetteten Custom-Blöcken (Visualisierung, Datentabelle).
- **Custom Input Components:** Redaktion kann Charts im Editor sehen.
- **Visual Editing / Presentation** + `defineLive` (Echtzeit) integrieren sauber mit Next.js.
- **Großzügiger Free-Tier**, geringer Wartungsaufwand — passend für ein Non-Profit.
- Gestalterische Referenz des Projekts ist ohnehin sanity.io.

## Konsequenzen

- Abhängigkeit von einem gehosteten Dienst (Free-Tier-Grenzen beachten).
- Inhalte liegen bei Sanity; Export/Backup-Strategie einplanen.

## Alternativen

- **Payload (self-hosted):** volle Datenhoheit, aber mehr Ops. Als spätere Option offen.
- **Directus:** datenbank-zentriert, redaktionell weniger poliert. Verworfen.
