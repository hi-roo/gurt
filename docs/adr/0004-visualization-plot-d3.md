# ADR 0004 — Observable Plot + D3 für Visualisierung

- **Status:** akzeptiert
- **Datum:** 2026-05-31

## Kontext

Gurts Kernkompetenz ist Datenvisualisierung auf NYT-Niveau: von schnellen Standard-Charts bis zu
maßgeschneiderten, interaktiven, scrollytelling-fähigen Stücken.

## Entscheidung

Ein **geschichteter** Ansatz:
- **Observable Plot** für Standard-Charts (Balken, Linie, Fläche) — schnell, konsistent.
- **D3** für bespoke/interaktive Visualisierungen (Zeitachsen, `position-matrix`, Animation).

Beide framework-agnostisch, in `packages/visualizations` als React-Inseln gekapselt.

## Begründung

- **Plot** liefert hochwertige Defaults mit wenig Code → Geschwindigkeit für Standardfälle.
- **D3** bietet die volle gestalterische Kontrolle für einzigartige Stücke — die „Decke" ist
  praktisch unbegrenzt.
- Beide arbeiten mit reinen Daten und kennen kein Framework/CMS → saubere Schichtentrennung.
- Farben/Typo kommen aus `@gurt/ui`, nicht aus der Lib → konsistentes Erscheinungsbild.

## Konsequenzen

- Zwei APIs im Werkzeugkasten; klare Faustregel nötig (siehe [06](../06-visualization-guidelines.md)).
- A11y muss aktiv mitgebaut werden (Tabellen-Fallback, `aria`) — ist als Pflicht verankert.

## Alternativen

- **visx:** React-native D3-Primitive, gute DX, aber etwas mehr Boilerplate und niedrigere Decke für
  ganz individuelle Stücke. Verworfen.
- **Recharts/Chart.js:** zu begrenzt für bespoke, redaktionelle Visualisierung. Verworfen.
