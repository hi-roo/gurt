# CLAUDE.md — Content-Schicht (`@gurt/studio`)

Sanity Studio. Referenz: [docs/02-content-model.md](../../docs/02-content-model.md).

## Verantwortung

- Schema-Definitionen (`schemas/`) als Single Source of Truth des Content-Modells.
- Redaktions-Workflow, Visual Editing (Presentation-Tool), Vision (GROQ-Playground).

## Struktur

- `schemas/documents/` — Dokumenttypen: `beitrag`, `thema`, `akteur`, `massnahme`, `position`,
  `datensatz`, `visualisierung`, `quelle`, `autor`, `idee` (Beitrags-Brief / Themen-Radar, intern).
- `schemas/objects/body.ts` — Portable Text + eingebettete Blöcke (Visualisierung, Datentabelle,
  Zitat, Quellen-Note, Diskurs).
- `schemas/index.ts` — registriert alle Typen.

## Regeln

1. **Schema = Vertrag.** Änderst du ein Feld, aktualisiere [docs/02-content-model.md](../../docs/02-content-model.md)
   und die GROQ-Queries/Typen in `apps/web/sanity`.
2. **Pflicht-Quellen** bei `position`, `datensatz` und der A11y-`beschreibung` der `visualisierung`.
3. **Neutralität strukturell:** `massnahme` trägt Pro- UND Contra-Argumente (belegt); `position` macht
   Haltungen explizit. Keine wertenden Feldnamen/Defaults.
4. **Alt-Texte** an Bildern.

## Befehle

```bash
pnpm --filter @gurt/studio dev        # Studio auf http://localhost:3333
pnpm --filter @gurt/studio deploy     # → gurt.sanity.studio (hosted)
```

Studio läuft auf **Sanity v5** und ist **Node-26-kompatibel** (kein `nvm use` nötig). Das hosted
Studio (`deploy`) schaltet auch den optionalen „Content Agent" frei.

Vor dem ersten Start: Sanity-Projekt anlegen und `SANITY_STUDIO_PROJECT_ID`/`SANITY_STUDIO_DATASET`
in **`apps/studio/.env.local`** setzen (siehe `apps/studio/.env.example`). Wichtig: Die CLI lädt
diese Variablen aus dem **Studio-Ordner**, nicht aus der Repo-Root-`.env.local`. Beim ersten
`dev`/`deploy` fragt die CLI einmalig nach `sanity login` (Account, der das Projekt besitzt).
