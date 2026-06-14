# 09 — Mitwirken

Gurt ist quelloffen und nicht-kommerziell (Code: PolyForm Noncommercial 1.0.0; Inhalte: CC BY-NC-ND 4.0).
Beiträge sind willkommen — Code, Design, Redaktion, Daten, Barrierefreiheit, Übersetzung. Mit einem
Beitrag stimmst du zu, dass er unter der jeweiligen Projektlizenz (Code bzw. Inhalte) veröffentlicht wird.

## Setup

```bash
nvm use && corepack enable
pnpm install
cp .env.example .env.local   # Werte eintragen
pnpm dev
```

## Workflow

1. **Issue zuerst.** Größere Änderungen vorab in einem Issue abstimmen.
2. **Branch** von `main`: `feat/…`, `fix/…`, `docs/…`.
3. **Klein & fokussiert** committen — Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
4. **Grün halten:** `pnpm lint && pnpm typecheck && pnpm test` müssen durchlaufen.
5. **PR** mit klarer Beschreibung; bei Inhalten die Checkliste aus
   [07-editorial-guidelines.md](07-editorial-guidelines.md) abhaken.

## Schicht-Regeln beachten

Bevor du Code schreibst, lies die `CLAUDE.md` der betroffenen Schicht und die passende `docs/*.md`.
Halte die Schichtgrenzen ein (siehe [01-architecture.md](01-architecture.md)).

## Qualitätsanspruch

- **TypeScript strict**, keine `any` ohne Begründung.
- **Externe Daten** immer mit Zod validieren.
- **A11y** ist Teil der Definition-of-Done, nicht optional.
- **Tests** für Daten-Adapter (Fixtures) und kritische Logik.

## Inhaltliche Beiträge

Redaktionelle Beiträge entstehen im Sanity Studio. Quellen- und Neutralitätspflicht gelten
ausnahmslos (siehe [07](07-editorial-guidelines.md) und [08](08-methodology.md)).

## Verhaltenskodex

Respektvoll, sachlich, konstruktiv. Wir bauen ein Werkzeug für demokratische Meinungsbildung —
der Umgang miteinander spiegelt diesen Anspruch.
