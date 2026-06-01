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
          { title: 'Linie', value: 'linie' },
          { title: 'Fläche', value: 'flaeche' },
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
