# Discovery — „Atlas": Navigation als Inhaltsgraph (OOUX)

> Status: Discovery-Prototyp unter `/lab/atlas` (noindex, von Live getrennt). Kein Live-Versprechen.
> Mutiger Sprung — methodisch geerdet, nicht beliebig.

## Prämisse

GURTs Inhalte sind **kein Seitenbaum, sondern ein Graph**: Beiträge gehören zu einem Bereich, tragen
mehrere Themen, stützen sich auf Datensätze und Quellen, beziehen Akteure und Maßnahmen ein. Eine
Navigation, die diesen Graphen nachbildet, statt ihn in ein Hierarchie-Menü zu zwängen, skaliert mit
dem Inhalt: **neuer Inhalt = neuer Knoten, kein neuer Menüpunkt.**

Methodische Grundlage: **OOUX (Object-Oriented UX)** — zuerst die Objekte und ihre Beziehungen, dann
die Navigation. Funktionaler Maßstab: **Carbon Design System** (A11y, Modularität, Skalierbarkeit).
Ästhetischer Maßstab: **Payload** (klare Typo, großzügiger Raum, Mikro-Interaktionen). Dark-by-default;
Farbe ist **Datenträger**, nicht Dekoration.

## 1. Objekt-Inventar (OOUX)

| Objekt | Kern­inhalt | Wichtige Metadaten | Verknüpfte Objekte (Nested) | Status |
| --- | --- | --- | --- | --- |
| **Beitrag** | Titel, Standfirst, Body | Datum, Ressort | → Bereich · Themen · Datensätze · Quellen · Akteure | live |
| **Bereich** (Ressort) | Name | institutionell, fix | → Beiträge | live |
| **Thema** | Name | offenes Tag | ↔ Beiträge (n:m) | live |
| **Datensatz** | Titel, Werte | Lizenz, Stand | → Quelle · ← Visualisierung | im Modell |
| **Quelle** | Titel, URL, Herausgeber | Abrufdatum | ← Beitrag · Datensatz · Position | im Modell |
| **Akteur** | Name | Person/Institution, Partei | ↔ Maßnahme (Position) | im Modell |
| **Maßnahme** | Titel, Status | Zeitachse | ↔ Akteur (Position) · Pro/Contra | im Modell |

**Nested Object Matrix (Kern):** Der Beitrag ist die Nabe der meisten Beziehungen; das **Thema** ist
der einzige Typ, der Bereiche *quer* verbindet (n:m) — daher das „Gewebe" im Graphen. Quelle/Datensatz
bilden die Belegkette (Transparenz), Akteur/Maßnahme die Diskurs-Kartierung.

## 2. Navigationskonzept — drei Ebenen, eine Logik

1. **Objekt-Shell (persistent).** Primärnavigation = die Objekt-Typen als Einstiege
   (`Beitrag · Bereich · Thema · Datensatz · Quelle · Akteur`) + Befehlspalette (⌘K). Skaliert, weil
   sie nicht mit Inhalten wächst.
2. **Objekt-Linse (Detail).** Jedes Objekt zeigt seine *verknüpften* Objekte als Pivots — vom Beitrag
   direkt zu Quelle, Thema, Akteur. Man springt entlang der Beziehungen, statt zurückzunavigieren. Die
   Nested Object Matrix wird begehbar.
3. **Atlas-Graph (Übersicht).** Vogelperspektive auf den Inhaltsgraphen. **Daten formen die Gestalt:**
   Nabengröße ∝ Anzahl Beiträge, Knotengröße ∝ Anzahl Themen, Linien = geteilte Themen. Auswahl hebt
   das Beziehungsgeflecht hervor und dimmt den Rest.

## 3. Radikaler Horizont vs. machbarer Schritt

- **Horizont:** „Navigation als 3D-Raum" — durch eine Daten-Konstellation fliegen, Cluster als
  Galaxien, Zeit als Tiefe. Beeindruckend, aber teuer für Performance, A11y und Mobile.
- **Umgesetzt:** dieselbe Idee als **2D-SVG-Konstellation** — räumlich aus Beziehungen, aber
  fokussierbar, tastaturbedienbar, mit Listen-Fallback und `prefers-reduced-motion`. *Ehrlichkeit vor
  Effekt* (GURT-Werte). Der 3D-Schritt bleibt optional und additiv.

## 4. Ästhetik & A11y (Spec)

- **Dark-Tokens:** Fläche `#0a0c12`, Karten `#11141c`, Linien `rgba(255,255,255,.10)`, Text `#e7eaf0`,
  gedämpft `#9aa3b2`. **Chroma nur für Daten:** Bereichsfarben aus der kategorialen `dataPalette`
  (Index = Bereich), UI ansonsten neutral.
- **Typografie:** FF Info (`--font-sans`) groß und ruhig (Payload-Haltung), Mono für Kicker/Meta.
- **Motion:** sanftes „Twinkle" der Knoten + Naben-Puls, nur bei `prefers-reduced-motion: no-preference`;
  Hover/Fokus skaliert Knoten, zeichnet Themen-Kanten, dimmt Unbeteiligte. Mikro-Interaktionen statt
  Dauer-Bewegung.
- **A11y (Carbon):** jeder Knoten ist ein fokussierbarer Link mit `aria-label`; Tab/Hover/Fokus
  aktualisieren die Objekt-Linse; vollständiger **Listen-Fallback** liefert dieselbe Information ohne
  Graph; Farbe nie alleiniger Bedeutungsträger (Labels + Liste).

## 5. Befund aus echten Daten (Bonus)

Der Atlas ist auch ein **redaktionelles Diagnose-Werkzeug**: aktuell teilen sich nur `energiepolitik`
(3 Beiträge), `klima` (2) und `parlament` (2) ein Thema — die übrigen Themen sind unikat. Das Gewebe ist
also dünn. *Das ist kein Render-Fehler, sondern ein Signal:* GURTs Themen sind unter-vernetzt. Konsequenter
getaggte Beiträge würden den Graphen — und die Auffindbarkeit — sofort dichter machen.

## 6. Nächste Schritte (wenn die Richtung trägt)

1. **Datensatz/Quelle/Akteur** als Knoten ergänzen (die Belegkette sichtbar machen).
2. **Befehlspalette (⌘K)** real: objekt-typisierte Suche („springe zu Quelle/Akteur/Thema").
3. **Objekt-Linse** an die echten Beitragsseiten andocken (Pivots im Artikel-Footer).
4. **Globale Dark-Tokens** statt lokaler /lab-Farben (Track #6 Dark Mode).
5. Tagging-Initiative gegen das dünne Themen-Gewebe (Befund §5).
