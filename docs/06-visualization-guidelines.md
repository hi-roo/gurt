# 06 — Visualisierungs-Leitlinien

Visualisierung ist Gurts Kernkompetenz. Maßstab: die interaktive Berichterstattung der New York
Times — klar, ehrlich, erklärend. Implementiert in `packages/visualizations`.

## Grundsätze

1. **Ehrlichkeit vor Effekt.** Keine abgeschnittenen Achsen, keine irreführenden Flächen, keine
   3D-Verzerrung. Die Grafik darf nie mehr behaupten, als die Daten hergeben.
2. **Erklären, nicht dekorieren.** Jedes visuelle Element trägt Bedeutung. Annotationen führen den
   Blick zur Aussage.
3. **Kontext mitliefern.** Bezugsgrößen, Zeiträume, Einheiten und Quelle sind immer sichtbar.
4. **Unsicherheit zeigen.** Schätzungen, Spannen und Prognosen werden als solche markiert.
5. **Mehrdeutigkeit zulassen.** Wenn mehrere Lesarten gültig sind, zeigt die Grafik das (vgl.
   `position-matrix` für „mehrere Dinge gleichzeitig richtig").

## Chart-Taxonomie (Start-Set)

| Typ              | Wofür                                              | Technik        |
| ---------------- | -------------------------------------------------- | -------------- |
| `balken`         | Vergleich von Kategorien                           | Observable Plot|
| `linie`          | Entwicklung über Zeit                              | Observable Plot|
| `flaeche`        | Anteile/Mengen über Zeit (gestapelt)              | Observable Plot|
| `zeitachse`      | Ereignis-Chronologie einer Maßnahme               | D3             |
| `position-matrix`| Akteure × Maßnahmen × Haltung (Leitbeispiel!)     | D3             |
| `bespoke`        | Maßgeschneiderte, scrollytelling-fähige Stücke     | D3             |

**Faustregel:** Standard → Observable Plot (schnell, konsistent). Sobald Interaktion, Animation,
Scrollytelling oder ungewöhnliches Encoding nötig ist → D3.

## Barrierefreiheit (verpflichtend)

Eine Visualisierung gilt erst als fertig, wenn:

- **Text-Alternative** vorhanden ist (`visualisierung.beschreibung`) — beschreibt die Kernaussage.
- **Tabellen-Fallback** existiert (die zugrunde liegenden Daten als `<table>`).
- **Farbe nicht allein** Bedeutung trägt (zusätzlich Muster/Label/Form).
- **Kontraste** WCAG AA erfüllen (Daten-Palette aus dem Design-System).
- **`prefers-reduced-motion`** respektiert wird (keine erzwungenen Animationen).
- **Tastatur & Screenreader** sinnvoll funktionieren (Fokus, `aria`, `role`).

## Technische Konventionen

- Komponenten sind **rein**: Daten + Config rein, SVG/Canvas raus. Kein Fetch, kein Sanity-Wissen.
- **Responsiv** über Container-Maße (ResizeObserver), nicht über Fenster-Breakpoints allein.
- **Farben & Typo** ausschließlich aus `@gurt/ui`-Tokens.
- **SSR-sicher:** Erstausgabe serverseitig (statisches SVG / Tabelle), Interaktivität als Insel
  nachgeladen — gut für Performance und A11y.
- Jede Visualisierung liefert immer auch ihren **statischen** Zustand (Print/No-JS).
