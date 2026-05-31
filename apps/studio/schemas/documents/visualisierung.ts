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
      type: 'reference',
      to: [{ type: 'datensatz' }],
      validation: (rule) => rule.required(),
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
