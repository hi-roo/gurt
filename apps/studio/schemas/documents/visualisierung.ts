import { defineField, defineType } from 'sanity';

export const visualisierung = defineType({
  name: 'visualisierung',
  title: 'Visualisierung',
  type: 'document',
  fields: [
    defineField({ name: 'titel', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'typ',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Balken', value: 'balken' },
          { title: 'Waffle (Anteile am Ganzen)', value: 'waffle' },
          { title: 'Treemap (Anteile/Größe)', value: 'treemap' },
          { title: 'Sankey (Flüsse)', value: 'sankey' },
          { title: 'Chord (symmetrische Beziehungen)', value: 'chord' },
          { title: 'Verhältnis / Icon-Array (N je 100)', value: 'verhaeltnis' },
          { title: 'Anteilsvergleich (100%-Balken nebeneinander)', value: 'anteilsbalken' },
          { title: 'Linie', value: 'linie' },
          { title: 'Fläche / Stream (Zusammensetzung über Zeit)', value: 'flaeche' },
          { title: 'Beeswarm (Verteilung im Feld)', value: 'beeswarm' },
          { title: 'Positions-Matrix', value: 'position-matrix' },
          { title: 'Zeitachse', value: 'zeitachse' },
          { title: 'Bespoke', value: 'bespoke' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'datensatz',
      title: 'Datensatz',
      description: 'Erforderlich für Chart-Typen (Balken/Linie/Fläche). Bei Positions-Matrix optional.',
      type: 'reference',
      to: [{ type: 'datensatz' }],
      hidden: ({ parent }) => parent?.typ === 'position-matrix',
    }),
    defineField({
      name: 'matrixPositionen',
      title: 'Positionen (Positions-Matrix)',
      description: 'Akteur × Maßnahme × Haltung — speist die Positions-Matrix.',
      type: 'array',
      hidden: ({ parent }) => parent?.typ !== 'position-matrix',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'akteur', title: 'Akteur', type: 'string' }),
            defineField({ name: 'massnahme', title: 'Maßnahme', type: 'string' }),
            defineField({
              name: 'haltung',
              title: 'Haltung',
              type: 'string',
              options: {
                list: [
                  { title: 'Dafür', value: 'dafuer' },
                  { title: 'Dagegen', value: 'dagegen' },
                  { title: 'Differenziert', value: 'differenziert' },
                  { title: 'Unklar', value: 'unklar' },
                ],
              },
            }),
            defineField({ name: 'zitat', title: 'Aussage (paraphrasiert)', type: 'text', rows: 2 }),
            defineField({
              name: 'quelle',
              title: 'Quelle (Pflicht bei Aussage)',
              description: 'Beleg direkt an der Aussage — Titel + Link.',
              type: 'object',
              fields: [
                defineField({ name: 'titel', title: 'Titel', type: 'string' }),
                defineField({ name: 'url', title: 'URL', type: 'url' }),
              ],
            }),
          ],
          preview: { select: { title: 'akteur', subtitle: 'massnahme' } },
        },
      ],
    }),
    defineField({
      name: 'encoding',
      title: 'Encoding',
      description: 'Welche Spalte auf welche Achse / Farbe.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'xFeld', title: 'X-Feld', type: 'string' }),
        defineField({ name: 'yFeld', title: 'Y-Feld', type: 'string' }),
        defineField({ name: 'kategorieFeld', title: 'Kategorie-Feld', type: 'string' }),
        defineField({ name: 'serieFeld', title: 'Serien-Feld', type: 'string' }),
        defineField({
          name: 'highlight',
          title: 'Hervorhebung (Kategorie-Wert)',
          description: 'Nur Beeswarm: welche Einheit hervorgehoben wird (z. B. „Deutschland“).',
          type: 'string',
        }),
        defineField({
          name: 'refWert',
          title: 'Referenzwert (Schwelle)',
          description: 'Nur Beeswarm: optionale Referenzlinie (z. B. ein Richtwert).',
          type: 'number',
        }),
        defineField({ name: 'refLabel', title: 'Referenz-Beschriftung', type: 'string' }),
        defineField({
          name: 'gestrichelteReihen',
          title: 'Gestrichelte Reihen (Linie)',
          description: 'Nur Linie: Serien-Werte, die gestrichelt gezeichnet werden (z. B. „Projektion“).',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'reihenfolge',
          title: 'Balken-Reihenfolge (Balken)',
          description:
            'Nur Balken: explizite Reihenfolge der Kategorien (statt Sortierung nach Wert) — z. B. um nach Gruppen zu ordnen (Deutschland oben, EU-27 unten). Werte exakt wie im Kategorie-Feld schreiben.',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'trennlinieNach',
          title: 'Trennlinie nach N Balken (Balken)',
          description:
            'Nur Balken mit gesetzter Reihenfolge: gestrichelte Trennlinie und größerer Abstand nach dem n-ten Balken — z. B. „2“, um Deutschland von EU-27 zu trennen.',
          type: 'number',
          validation: (rule) => rule.integer().min(1),
        }),
        defineField({
          name: 'zweifarbig',
          title: 'Zweifarbig (Verhältnis/Icon-Array)',
          description:
            'Nur Verhältnis: Basis und Hervorhebung als zwei gleichwertige Kategorien (Basis erhält eine eigene Palettenfarbe statt Grau) — z. B. Arbeit vs. Kapital.',
          type: 'boolean',
        }),
        defineField({
          name: 'farben',
          title: 'Identitätsfarben (z. B. Chord)',
          description:
            'Optional: feste Label→Farbe-Zuordnung als „Label:#hex“ (z. B. „SPD:#e3007d“). Dokumentierte Ausnahme von der kategorialen Palette — nur für Charts über benannte Akteure/Fraktionen, nie wertend.',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({ name: 'caption', title: 'Bildunterschrift', type: 'text', rows: 2 }),
    defineField({
      name: 'beschreibung',
      title: 'Text-Alternative (A11y)',
      description: 'Pflicht: beschreibt die Kernaussage für Screenreader / als Tabellen-Beschreibung.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().error('Text-Alternative ist Pflicht (Barrierefreiheit).'),
    }),
    defineField({
      name: 'annotationen',
      title: 'Annotationen',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'x', title: 'X', type: 'string' }),
            defineField({ name: 'y', title: 'Y', type: 'number' }),
            defineField({ name: 'text', title: 'Text', type: 'string' }),
          ],
          preview: { select: { title: 'text' } },
        },
      ],
    }),
  ],
  preview: { select: { title: 'titel', subtitle: 'typ' } },
});
