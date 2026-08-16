# 07 — Redaktionelle Leitlinien

Diese Leitlinien sichern Gurts Glaubwürdigkeit. Sie sind verbindlich — für Menschen wie für
KI-Unterstützung im Repo.

## Oberster Grundsatz: erklären, nicht überreden

Gurt **informiert und ordnet ein**, es **kampagnisiert nicht**. Die Haltung liegt in der **Methode**,
nicht in der Parteinahme: Gurt ist *nicht* neutral gegenüber Fakten, Quellen oder methodischen
Fehlern — vermeidet aber parteipolitische Vorfestlegungen. Der Unterschied zwischen Journalismus und
Propaganda ist hier strukturell verankert, nicht nur eine Absicht.

## Neutralität in der Praxis

1. **Mehrere Wahrheiten nebeneinander — aber nicht beliebig.** Wo Zielkonflikte bestehen (z. B.
   Versorgungssicherheit vs. Klimakosten), werden sie als solche dargestellt — mit belegten Pro- und
   Contra-Punkten, nicht vorschnell aufgelöst zu einer „richtigen" Seite. Das heißt **nicht**, alles
   gleich gültig zu machen: *Mehrere Dinge können gleichzeitig richtig sein — aber nicht alles.*
   Gezeigt wird, unter welchen Annahmen eine Position tragfähig ist und wo ihre Grenzen liegen.
2. **Sachliche Sprache.** Keine wertenden Adjektive, keine Suggestivfragen, kein Framing per
   Wortwahl. Akteure werden mit ihrer Funktion benannt, nicht charakterisiert.
3. **Symmetrische Sorgfalt.** Positionen aller relevanten Akteure werden mit gleicher Genauigkeit
   und gleichem Quellen-Anspruch behandelt.
4. **Keine parteipolitische Einfärbung als Default.** Farben/Reihenfolgen dürfen keine Wertung
   transportieren (siehe Design-System).
5. **Selektion offenlegen.** Was gezeigt wird (und was nicht), ist eine redaktionelle Entscheidung —
   sie wird im Methodik-Hinweis transparent gemacht.

## Quellenpflicht

- **Jede** Tatsachenbehauptung und **jede** Zahl referenziert eine `quelle`.
- Primärquellen schlagen Sekundärquellen.
- **Zitate sind wörtlich oder gar nicht.** Ein Zitat in „…“ gibt den Wortlaut unverändert wieder —
  keine stille Anpassung von Groß-/Kleinschreibung, Grammatik oder Flexion an den eigenen Satzbau.
  Passt es nicht, wird paraphrasiert statt angeglichen.
- **Kein Satz endet, wo er nicht endet.** Auslassungen werden mit […] markiert; ein mitten im Satz
  abgeschnittenes Zitat wird nicht mit Punkt als vollständiger Satz ausgegeben.
- **Beleg ist das Dokument, nicht der Akteur.** Verlinkt wird die Fundstelle, in der der Satz
  nachweislich steht — nicht eine andere Äußerung derselben Person zur selben Sache.
- **Kontext vor Zuspitzung.** Ein Nebensatz, der zugespitzter klingt als die Position, die er
  belegt, ist kein geeignetes Zitat.
- Das gilt für alle Stellen mit Quelle: `position.quelle`, `diskursBlock.perspektiven[].quelle`,
  `zitatBlock.quelle`. Im **Diskurs-Block** ist die Paraphrase der Normalfall, das Primärzitat aber
  ausdrücklich zulässig (docs/10 Regel 5); zitiert eine Sichtweise wörtlich, verlangt das Studio
  eine URL. In der **Positions-Matrix** bleibt es bei der Paraphrase — dort steht pro Zelle nur ein
  Halbsatz neben einer Haltungsfarbe, ein Format, in dem Zitatfragmente verzerren.
- Bei Unsicherheit: Unsicherheit benennen, nicht glätten.

## Trennung von Nachricht und Einordnung

- **Beschreibung** (was ist der Fall) und **Einordnung** (wie ist es zu verstehen) sind sichtbar
  getrennt. Einordnung ist begründet und belegt, nie Meinung im Gewand der Tatsache.

## Umgang mit Personen

- Funktion vor Person. Keine ad-hominem-Wertungen.
- Bei personenbezogenen Daten: Datenschutz und Verhältnismäßigkeit wahren.

## Korrekturen

- Fehler werden **transparent** korrigiert und gekennzeichnet (siehe [08-methodology.md](08-methodology.md)).
- Eine sichtbare Korrektur ist ein Qualitätsmerkmal, kein Makel.

## Checkliste vor Veröffentlichung

- [ ] Jede Zahl/Aussage hat eine Quelle.
- [ ] Pro- und Contra-Sicht bei strittigen Maßnahmen belegt.
- [ ] Keine wertende Sprache, keine suggestive Visualisierung.
- [ ] Methodik-Hinweis vorhanden (Datenstand, Auswahl, Grenzen).
- [ ] A11y der Visualisierungen erfüllt (siehe [06](06-visualization-guidelines.md)).
- [ ] Förder-/Interessenskonflikte offengelegt, falls relevant.
