import { defineField, defineType } from 'sanity';

export const akteur = defineType({
  name: 'akteur',
  title: 'Akteur',
  type: 'document',
  description: 'Person oder Institution (z. B. Katharina Reiche, BMWK).',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'art',
      title: 'Art',
      type: 'string',
      options: {
        list: [
          { title: 'Person', value: 'person' },
          { title: 'Institution', value: 'institution' },
        ],
        layout: 'radio',
      },
      initialValue: 'person',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'rolle', title: 'Rolle / Funktion', type: 'string' }),
    defineField({
      name: 'partei',
      title: 'Partei',
      type: 'string',
      hidden: ({ parent }) => parent?.art !== 'person',
    }),
    defineField({
      name: 'institution',
      title: 'Zugehörige Institution',
      type: 'reference',
      to: [{ type: 'akteur' }],
      options: { filter: 'art == "institution"' },
      hidden: ({ parent }) => parent?.art !== 'person',
    }),
    defineField({ name: 'bio', title: 'Kurzbeschreibung', type: 'text', rows: 3 }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt-Text', type: 'string' })],
    }),
    defineField({
      name: 'offizielleLinks',
      title: 'Offizielle Links',
      type: 'array',
      of: [{ type: 'url' }],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'rolle' } },
});
