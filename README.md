# Gurt

> Politik verständlich machen — durch Datenvisualisierung und anschauliche Beispiele.

**Live (Vorschau):** [gurt-report.vercel.app](https://gurt-report.vercel.app)

**Gurt** ([gurt.report](https://gurt.report)) ist eine gemeinnützige Daten-Journalismus-Plattform.
Sie erklärt aktuelle politische Leitlinien aus Deutschland und der EU mit interaktiven Schaubildern
und ordnet sie **kritisch, aber nicht propagandistisch** ein. Vorbild ist die interaktive
Berichterstattung der New York Times; gestalterische Referenz ist [sanity.io](https://www.sanity.io).

Das Projekt soll über Jahre wachsen, der Öffentlichkeit als Informationsplattform dienen und zeigen,
wie politische Kommunikation von interaktiver Aufbereitung profitieren kann.

---

## Tech-Stack

| Schicht            | Technologie                              | Ort                       |
| ------------------ | ---------------------------------------- | ------------------------- |
| Content / Redaktion | [Sanity](https://www.sanity.io) Studio   | `apps/studio`             |
| Präsentation        | [Next.js 15](https://nextjs.org) (App Router) | `apps/web`           |
| Design-System       | Tailwind CSS v4 (Preset/Theme)           | `packages/ui`             |
| Visualisierung      | [Observable Plot](https://observablehq.com/plot) + [D3](https://d3js.org) | `packages/visualizations` |
| Daten / ETL         | Getypte Adapter (data.europa.eu, Bundestag-DIP) | `packages/data`     |
| Doku / Direktiven   | Markdown                                 | `docs/`                   |
| Hosting             | [Vercel](https://vercel.com)             | —                         |

Monorepo mit **pnpm-Workspaces** + **Turborepo**. Jede Schicht ist sauber getrennt und hat eine eigene
`CLAUDE.md`-Direktive.

---

## Schnellstart

```bash
# 1. Voraussetzungen: Node ≥ 22, pnpm ≥ 11
nvm use            # nutzt .nvmrc
corepack enable    # aktiviert pnpm

# 2. Abhängigkeiten installieren
pnpm install

# 3. Umgebung konfigurieren
cp .env.example .env.local
#   → Werte eintragen (siehe docs/04-data-sources.md & .env.example)

# 4. Entwicklung starten (Web + Studio parallel)
pnpm dev
```

| Befehl            | Wirkung                                          |
| ----------------- | ------------------------------------------------ |
| `pnpm dev`        | Startet `apps/web` (Port 3000) & `apps/studio` (Port 3333) |
| `pnpm build`      | Baut alle Packages (Turbo-Orchestrierung)        |
| `pnpm lint`       | ESLint über alle Packages                        |
| `pnpm typecheck`  | TypeScript-Prüfung                               |
| `pnpm test`       | Vitest-Unit-Tests                                |
| `pnpm format`     | Prettier-Formatierung                            |

---

## Projektstruktur

```
gurt/
├── docs/                  # Direktive .md-Files — die „Verfassung" des Projekts
├── apps/
│   ├── studio/            # Sanity Studio (Content-Schicht)
│   └── web/               # Next.js Frontend (Präsentations-Schicht)
└── packages/
    ├── ui/                # Design-System (Tokens, Primitive)
    ├── visualizations/    # Plot/D3-Komponenten
    ├── data/              # Datenquellen-Adapter + ETL
    └── config/            # Geteilte tsconfig/eslint/prettier
```

Architektur im Detail: [docs/01-architecture.md](docs/01-architecture.md).

---

## Mitwirken

Gurt ist Open Source und freut sich über Beiträge — von Redaktion über Design bis Code.
Siehe [docs/09-contributing.md](docs/09-contributing.md) und die redaktionellen Leitlinien in
[docs/07-editorial-guidelines.md](docs/07-editorial-guidelines.md).

## Lizenz

Code: **MIT**. Inhalte: **CC BY 4.0** (sofern nicht anders gekennzeichnet). Quell-Datensätze
unter ihren jeweiligen Lizenzen. Siehe [LICENSE](LICENSE) und [docs/04-data-sources.md](docs/04-data-sources.md).
