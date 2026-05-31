import { defineField, defineType } from 'sanity';

export const thema = defineType({
  name: 'thema',
  title: 'Thema',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'beschreibung', title: 'Beschreibung', type: 'text', rows: 3 }),
    defineField({
      name: 'farbe',
      title: 'Themenfarbe',
      description: 'Token aus der Daten-Palette (siehe Design-System). Keine parteipolitischen Farben.',
      type: 'string',
      options: {
        list: [
          { title: 'Daten 1 (Blau)', value: 'data-1' },
          { title: 'Daten 2 (Orange)', value: 'data-2' },
          { title: 'Daten 3 (Grün)', value: 'data-3' },
          { title: 'Daten 4 (Pink)', value: 'data-4' },
          { title: 'Daten 5 (Hellblau)', value: 'data-5' },
          { title: 'Daten 6 (Zinnober)', value: 'data-6' },
        ],
      },
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'beschreibung' } },
});
