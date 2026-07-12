# docs/12 — Themen-Radar und Backlog-Pflege

Wie GURT das **nächste Thema** findet, priorisiert und den Ideen-Backlog sauber hält.
Ergänzt [docs/00](00-overview.md) (Mission) und die Skills `gurt-quellen`, `gurt-storytelling`,
`gurt-review`. Ziel: aus Signalen nachvollziehbar den nächsten Beitrag ableiten — ohne dass gute
Ideen verloren gehen oder der Backlog vermüllt.

## Zwei Quellen, ein Backlog

Der Backlog besteht aus `idee`-Dokumenten in Sanity (**Studio-only, nie auf der Website**). Sie
entstehen aus zwei Quellen:

- **Signalgetrieben** — der Themen-Radar (`scripts/themen-radar.ts`) scannt die Bundestag-DIP für
  eine **fixe Stichwortliste** (`TOPICS`) und legt neue `idee.dip.<vorgang-id>` an (idempotent,
  `createIfNotExists`). Wöchentlich per GitHub-Action `themen-radar.yml` oder manuell.
- **Kuratiert** — redaktionell gesetzte `idee.kurat.<slug>` (menschliche Themen-Ideen).

> **Wichtig:** Der Radar surfacet **nur seine Stichwörter**. Im Chat oder Kopf brainstormte Themen
> erscheinen NICHT automatisch — sie müssen als `TOPICS`-Eintrag *und/oder* als kuratierte Idee
> angelegt werden. Ein neues Feld heißt also: Stichwort in `TOPICS` ergänzen **und** ggf. eine
> `idee.kurat.*` setzen.

## Lebenszyklus einer Idee (`status`)

```
vorschlag ──► umgesetzt   (ein Beitrag realisiert die Idee)
          └─► verworfen   (kein Benchmark-Wert / zu schmal / Dublette)
```

- **Pflicht beim Veröffentlichen:** Sobald ein Beitrag eine Idee realisiert, die Idee auf
  `umgesetzt` setzen — das schließt die Schleife und hält den Backlog ehrlich.
- **Zeitnah `verworfen`:** schmale Kleine Anfragen und Einzel-Vorgänge ohne Benchmark-Tragweite,
  damit die offene Liste die *echten* Kandidaten zeigt.
- Der Radar legt verworfene/umgesetzte Ideen **nicht erneut** an (gleiche deterministische `_id`).

## Der Prozess „nächstes Thema"

1. **Radar scharf laufen lassen** — `pnpm radar:topics` (schreibt neue Ideen; bestehende bleiben
   unangetastet). Vorschau ohne Schreiben: `pnpm radar:topics -- --dry`.
2. **Backlog aufrufen** — `pnpm backlog` (offene Ideen nach Feld). `pnpm backlog --all` zeigt auch
   umgesetzt/verworfen.
3. **Priorisieren** nach den Kriterien unten.
4. **Wählen** — der Mensch entscheidet, welches Thema als Nächstes gebaut wird.
5. **Bauen** — `gurt-storytelling` + `gurt-quellen` (Recherche, seed.ts, Viz, Diskurs).
6. **Prüfstraße** — `gurt-review` (Workflow `review-beitrag`), **Pflicht für neue Beiträge**;
   Auflagen fixen; Freigabe erteilt der Mensch → `publish:sanity` + live.
7. **Idee schließen** — `pnpm idee:status umgesetzt <idee-id>`.

## Priorisierungs-Kriterien (GURT-Linse)

In dieser Reihenfolge gewichten:

1. **Neuer Benchmark-Wert** — ein noch nicht abgedecktes Feld schlägt Refresh/Sub-Winkel.
2. **Harte, visualisierbare Zahlenfrage** — klare Größen, als Zeitreihe/Anteil/Fluss zeigbar.
3. **Datenlage** — Primärquellen verfügbar und aktuell (docs/08, `gurt-quellen`).
4. **Zielkonflikt und Neutralität** — „mehrere Dinge gleichzeitig richtig"; Pro und Contra sauber
   trennbar, ohne parteipolitische Vorfestlegung (docs/07).
5. **Aktualität** — laufender Vorgang, aktuelle Debatte.

> **Doppel-Signal** (eine kuratierte Idee **und** ein aktueller DIP-Vorgang zum selben Thema) ist
> das stärkste Reife-Zeichen — dort ist Relevanz belegt und der Aufhänger meist schon da.

## Werkzeuge

| Zweck | Befehl |
| --- | --- |
| Radar scharf (schreiben) | `pnpm radar:topics` (`-- --dry` = Vorschau) |
| Backlog ansehen | `pnpm backlog` (`--all` inkl. umgesetzt/verworfen) |
| Idee schließen/verwerfen/öffnen | `pnpm idee:status <umgesetzt\|verworfen\|vorschlag> <id ...>` |
| Radar-Stichwörter erweitern | `TOPICS` in `scripts/themen-radar.ts` |

**Env** für alle: Sanity-Write-Token + `DIP_API_KEY` aus der `.env.local`. Die npm-Skripte laden per
`--env-file-if-exists=.env.local` (Haupt-Checkout). Im **Worktree** (kein eigenes `.env.local`) die
Skripte direkt mit dem Root-Env aufrufen:
`node --env-file=/PFAD/zum/repo/.env.local scripts/backlog.mjs`.

## Radar erweitern

Neues Feld = neuer `TOPICS`-Eintrag: `stichwort` (DIP-**Titelfilter**), `themenfeld`, `leitfrage`,
`kandidatenQuellen`, `vizIdee`. Danach `-- --dry` prüfen, ob das Stichwort echte Vorgänge liefert;
liefert es 0, das Stichwort schärfen (z. B. konkreter Fachbegriff statt Oberbegriff). Feldnamen
möglichst zu bestehenden Themenfeldern konsistent halten.
