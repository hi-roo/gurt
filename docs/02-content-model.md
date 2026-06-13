# 02 — Content-Modell

Das Content-Modell ist das **Herz** von Gurt. Es ist so entworfen, dass sich „mehrere Dinge können
gleichzeitig richtig sein" strukturell abbilden lässt — also Politik als ein Netz aus Akteuren,
Maßnahmen und Positionen, nicht als lineare Erzählung.

Implementiert als Sanity-Schemas in `apps/studio/schemas/`. Externe Daten werden an der Grenze mit
Zod validiert (`packages/data`), bevor sie hier landen.

## Entitäten-Übersicht

```
Beitrag ──┬─ enthält ─▶ Body (Portable Text + eingebettete Blöcke)
          ├─ behandelt ─▶ Thema(en)
          ├─ nennt ─▶ Akteur(e)
          ├─ untersucht ─▶ Maßnahme(n)
          └─ Autor(en)

Maßnahme ──┬─ verantwortet von ─▶ Akteur(e)
           └─ hat ─▶ Position(en)

Position = Akteur × Maßnahme × Haltung (+ Zitat + Quelle)

Visualisierung ── nutzt ─▶ Datensatz ── stammt aus ─▶ Quelle
```

## Entitäten

### `beitrag` — Beitrag

Die redaktionelle Einheit.

| Feld          | Typ                       | Hinweis                                            |
| ------------- | ------------------------- | -------------------------------------------------- |
| `titel`       | string (Pflicht)          |                                                    |
| `slug`        | slug (Pflicht)            | aus Titel generiert                                |
| `standfirst`  | text                      | Vorspann / Dachzeile                               |
| `autoren`     | array<reference→autor>    |                                                    |
| `themen`      | array<reference→thema>    |                                                    |
| `akteure`     | array<reference→akteur>   | erwähnte Akteure                                   |
| `massnahmen`  | array<reference→massnahme>| behandelte Maßnahmen                               |
| `body`        | Portable Text             | inkl. Blöcke: `visualisierungBlock`, `datentabelle`, `zitat`, `quellenNote`, `vergleich` |
| `methodik`    | text                      | Methodik-/Transparenz-Hinweis                      |
| `veroeffentlicht` | datetime              |                                                    |
| `aktualisiert`| datetime                  |                                                    |
| `status`      | string (enum)             | `entwurf` · `review` · `veroeffentlicht`           |

### `thema` — Thema

| Feld          | Typ              | Hinweis                          |
| ------------- | ---------------- | -------------------------------- |
| `name`        | string (Pflicht) | z. B. „Energiepolitik"           |
| `slug`        | slug             |                                  |
| `beschreibung`| text             |                                  |
| `farbe`       | string           | Token-Name aus dem Design-System |

### `akteur` — Akteur (Person ODER Institution)

| Feld          | Typ              | Hinweis                                  |
| ------------- | ---------------- | ---------------------------------------- |
| `name`        | string (Pflicht) | z. B. „Katharina Reiche", „BMWK"         |
| `art`         | string (enum)    | `person` · `institution`                 |
| `rolle`       | string           | z. B. „Bundesministerin für Wirtschaft"  |
| `partei`      | string           | nur bei Personen                         |
| `institution` | reference→akteur | Zugehörigkeit (Person → Institution)     |
| `bio`         | text             |                                          |
| `foto`        | image            | mit Pflicht-`alt`                        |
| `offizielleLinks` | array<url>   | Quellen zur offiziellen Position         |

### `massnahme` — Maßnahme / Politik-Vorhaben

Das Vehikel, um Vorhaben neutral zu beschreiben und kontrovers einzuordnen.

| Feld           | Typ                      | Hinweis                                   |
| -------------- | ------------------------ | ----------------------------------------- |
| `titel`        | string (Pflicht)         | z. B. „Bau neuer Gaskraftwerke"           |
| `slug`         | slug                     |                                           |
| `beschreibung` | text                     | sachlich, wertneutral                     |
| `status`       | string (enum)            | `vorgeschlagen` · `laufend` · `beschlossen` · `gestoppt` |
| `verantwortlich`| array<reference→akteur> |                                           |
| `zeitachse`    | array<{datum, ereignis, quelle}> | Chronologie mit Belegen           |
| `proArgumente` | array<{text, quelle}>    | belegte Pro-Punkte                        |
| `contraArgumente`| array<{text, quelle}>  | belegte Contra-Punkte                     |
| `quellen`      | array<reference→quelle>  |                                           |

### `position` — Position

Verbindet einen `akteur` mit einer `massnahme` und einer Haltung. Erzeugt die Datenbasis für
„Wer steht wie zu was"-Visualisierungen.

| Feld        | Typ                 | Hinweis                                       |
| ----------- | ------------------- | --------------------------------------------- |
| `akteur`    | reference→akteur (Pflicht) |                                        |
| `massnahme` | reference→massnahme (Pflicht) |                                     |
| `haltung`   | string (enum)       | `dafuer` · `dagegen` · `differenziert` · `unklar` |
| `zitat`     | text                | wörtliches Zitat, wenn vorhanden              |
| `quelle`    | reference→quelle (Pflicht) | Beleg ist verpflichtend                |
| `datum`     | date                | Stand der Position                            |

### `datensatz` — Datensatz

| Feld         | Typ                | Hinweis                                       |
| ------------ | ------------------ | --------------------------------------------- |
| `titel`      | string (Pflicht)   |                                               |
| `quelle`     | reference→quelle (Pflicht) |                                       |
| `lizenz`     | string             | z. B. „CC BY 4.0", „dl-de/by-2-0"             |
| `abgerufenAm`| datetime           |                                               |
| `spalten`    | array<{name, label?, typ, einheit, beschreibung}> | Schema der Daten; `label` = lesbarer Spaltenkopf im A11y-Tabellen-Fallback (Fallback: `name`) |
| `daten`      | array<object> oder file | Inline-JSON (klein) oder CSV/JSON-Asset  |
| `provenienz` | text               | wie wurde transformiert?                       |

### `visualisierung` — Visualisierung

Konfiguration, die `packages/visualizations` zu einem Chart rendert.

| Feld           | Typ                | Hinweis                                          |
| -------------- | ------------------ | ------------------------------------------------ |
| `titel`        | string (Pflicht)   |                                                  |
| `typ`          | string (enum)      | `balken` · `linie` · `flaeche` · `position-matrix` · `zeitachse` · `bespoke` |
| `datensatz`    | reference→datensatz | Pflicht für Chart-Typen; bei `position-matrix` entfällt er |
| `matrixPositionen` | array<{akteur, massnahme, haltung, zitat}> | nur `position-matrix`: speist die Matrix |
| `encoding`     | object             | Achsen-/Farb-/Reihen-Zuordnung (typ-spezifisch)  |
| `caption`      | text               | Bildunterschrift                                 |
| `beschreibung` | text (Pflicht)     | **A11y**: Text-Alternative / Tabellen-Beschreibung |
| `annotationen` | array<{x, y, text}>| redaktionelle Hervorhebungen                     |

### `quelle` — Quelle

Glaubwürdigkeit ist nicht verhandelbar — jede Aussage/Zahl referenziert eine Quelle.

| Feld         | Typ              | Hinweis                                    |
| ------------ | ---------------- | ------------------------------------------ |
| `titel`      | string (Pflicht) |                                            |
| `herausgeber`| string           | z. B. „Deutscher Bundestag"                |
| `url`        | url              |                                            |
| `typ`        | string (enum)    | `primaerdokument` · `datensatz` · `aussage` · `studie` · `medienbericht` |
| `abgerufenAm`| datetime         |                                            |
| `lizenz`     | string           |                                            |
| `archivUrl`  | url              | z. B. Wayback-Machine-Snapshot             |

### `autor` — Autor:in

| Feld    | Typ              | Hinweis            |
| ------- | ---------------- | ------------------ |
| `name`  | string (Pflicht) |                    |
| `rolle` | string           |                    |
| `bio`   | text             |                    |
| `foto`  | image            | mit Pflicht-`alt`  |

## Portable-Text-Blöcke (im `beitrag.body`)

- `visualisierungBlock` → referenziert eine `visualisierung`, rendert die interaktive Insel.
- `datentabelle` → tabellarische Darstellung eines `datensatz` (auch A11y-Fallback).
- `zitat` (`zitatBlock`) → Zitat + Quellen-Referenz. Optional `imHero` (boolean) + `heroEyebrow`
  (string): markiert das Zitat für die **Startseiten-CTA-Rotation** — die Startseite zieht alle
  so markierten `zitatBlock`s per GROQ (`heroZitateQuery`/`getHeroZitate`), eine Quelle für Beitrag
  UND Hero. Redaktionell paarweise je Streitfrage (Regierung ↔ Gegenstimme) für Ausgewogenheit.
- `quellenNote` → Inline-Beleg / Fußnote.
- `vergleich` → Gegenüberstellung (z. B. zwei Maßnahmen / zwei Szenarien).

## Validierungs-Prinzipien

- Pflicht-Quellen bei `position`, `datensatz`, `visualisierung.beschreibung` (A11y).
- `slug` eindeutig pro Typ.
- Bilder erzwingen `alt`-Text.
