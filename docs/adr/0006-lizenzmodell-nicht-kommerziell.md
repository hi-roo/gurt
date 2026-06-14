# ADR 0006 — Lizenzmodell: nicht-kommerziell (Code PolyForm NC, Inhalte CC BY-NC-ND)

- **Status:** Angenommen
- **Datum:** 2026-06
- **Kontext-Doku:** [LICENSE](../../LICENSE), [docs/08-methodology.md](../08-methodology.md)

## Kontext

GURT versteht sich als **nicht-kommerzielle, gemeinwohlorientierte** Daten-Journalismus-Plattform
(siehe [docs/00-overview.md](../00-overview.md), Impressum/Über). Das bisherige Lizenzmodell stand
dazu im Widerspruch:

- **Quellcode: MIT** — erlaubt ausdrücklich auch die kommerzielle Nutzung („to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell").
- **Inhalte: CC BY 4.0** — erlaubt ebenfalls kommerzielle Nutzung und Bearbeitungen.

Der Betreiber hat entschieden, die **kommerzielle Nutzung des Projekts einzuschränken**, damit die
Lizenzlage die nicht-kommerzielle Haltung abbildet.

## Entscheidung

Getrennt nach Quellcode und Inhalten; externe Datensätze unverändert:

1. **Quellcode → [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0).**
   Moderne, klar formulierte Source-Available-Lizenz, die ausschließlich nicht-kommerzielle Zwecke
   erlaubt (inkl. Nutzung durch gemeinnützige Organisationen, Bildung, Forschung, Behörden). Volltext
   in `LICENSE`.
2. **Redaktionelle Inhalte → CC BY-NC-ND 4.0** (Attribution-NonCommercial-NoDerivatives). Namensnennung,
   nicht-kommerziell, keine Bearbeitungen — nur unveränderte Weitergabe.
3. **Externe Datensätze** (data.europa.eu, Bundestag/DIP, abgeordnetenwatch, Destatis …) behalten ihre
   jeweilige Quell-Lizenz (CC0, dl-de/by-2.0, amtliche Werke …), die pro Datensatz ausgewiesen wird
   (siehe [docs/04-data-sources.md](../04-data-sources.md)). Diese gehen vor; die GURT-Lizenzen
   erstrecken sich nicht auf fremde Daten.

`package.json` führt `"license": "SEE LICENSE IN LICENSE"` (PolyForm steht nicht auf der SPDX-Liste).

## Konsequenzen

- **Nicht mehr „Open Source" im OSI-Sinn.** NC-Lizenzen sind quelloffen/source-available, aber nicht
  OSI-zertifiziert. Wording in README, /über, /methodik, docs auf „quelloffen, nicht-kommerziell"
  angepasst.
- **Nicht rückwirkend.** Bereits unter MIT veröffentlichter Code (Git-Historie, frühere Stände) bleibt
  für jeden, der ihn hat, unter MIT nutzbar. Die neue Lizenz greift ab diesem Stichtag.
- **Rechteinhaberschaft.** Die Relizenzierung setzt voraus, dass der Betreiber Urheber/Rechteinhaber
  ist (Solo-Projekt). Künftige Code-Beiträge laufen unter der Projektlizenz; fremde Beiträge ließen
  sich nicht einseitig umlizenzieren.
- **Abhängigkeiten unberührt.** Verwendete Libraries behalten ihre (überwiegend permissiven) Lizenzen.
- **Inhalte-Nachnutzung enger.** CC BY-NC-ND lässt nur die unveränderte, nicht-kommerzielle Weitergabe
  mit Namensnennung zu — keine abgeleiteten Werke. (Zitatrecht/„fair use" bleibt unberührt.)

## Erwogene Alternativen

- **Business Source License 1.1** (zeitversetzt offen: jetzt NC, nach Stichdatum automatisch MIT/Apache)
  — verworfen zugunsten einer dauerhaft nicht-kommerziellen Lizenz.
- **CC BY-NC 4.0** für die Inhalte (mit erlaubten Bearbeitungen) — bewusst zugunsten der restriktiveren
  **ND**-Variante (keine Bearbeitungen) verworfen.
- **CC-Lizenz auch für den Code** — verworfen, da Creative Commons ausdrücklich von CC-Lizenzen für
  Software abrät; PolyForm ist dafür gemacht.

## Betroffene Stellen

`LICENSE` · `package.json` · `README.md` · `docs/00-overview.md` · `docs/08-methodology.md` ·
`apps/web/app/ueber/page.tsx` · `apps/web/app/impressum/page.tsx`.
