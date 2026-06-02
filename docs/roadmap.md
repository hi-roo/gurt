# Roadmap

Lebendiges Dokument. Reihenfolge ≈ Priorität, nicht in Stein gemeißelt.

> **Phasen & Richtung** stehen hier; die konkreten, priorisierten Arbeitspakete (mit IDs, DoD und
> Datenquellen) führt das [Backlog](backlog.md).

## Phase 0 — Fundament (dieses Setup)

- [x] Monorepo, Schichtentrennung, Direktiven (`docs/`), Lizenz
- [x] Content-Modell als Sanity-Schemas
- [x] Design-System-Grundlage (`packages/ui`)
- [x] Visualisierungs-Grundlage + Flagship-Beispiel (`packages/visualizations`)
- [x] Next.js-Frontend mit Beispiel-Beitrag (Energie/Reiche)
- [x] Datenquellen-Adapter (data.europa.eu, Bundestag-DIP) + Fixtures-Tests
- [x] CI, Lint/Typecheck/Test

## Phase 1 — Live gehen

- [ ] Sanity-Projekt produktiv, Studio deployt
- [x] Vercel-Deployment · Domain `gurt.info` (in Vercel registriert, Nameserver-Propagation läuft)
- [ ] Erste echte Beiträge (Energiepolitik)
- [ ] SEO, Sitemap, OpenGraph, RSS

## Phase 2 — Tiefe

- [ ] Weitere Chart-Typen (Scrollytelling, Karten)
- [ ] Automatisierte Ingestion-Jobs (GitHub Actions) für DIP/data.europa.eu
- [ ] Volltextsuche
- [ ] Themen-Hubs & Akteurs-Profile

## Phase 3 — Reichweite & Wirkung

- [ ] Einbettbare Visualisierungen (für andere Redaktionen)
- [ ] Mehrsprachigkeit (EN)
- [ ] Daten-Downloads & API für die Öffentlichkeit
- [ ] Barrierefreiheits-Audit (extern)

## Offene Fragen

- Trägerschaft / gemeinnützige Rechtsform?
- Redaktionsbeirat zur Wahrung der Neutralität?
- Finanzierungsmodell (Spenden, Stiftungen, Förderungen)?
