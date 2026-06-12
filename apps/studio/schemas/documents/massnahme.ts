import { defineField, defineType } from 'sanity';

const proContraPunkt = {
  type: 'object' as const,
  fields: [
    defineField({ name: 'text', title: 'Punkt', type: 'text', rows: 2 }),
    defineField({ name: 'quelle', title: 'Quelle', type: 'reference', to: [{ type: 'quelle' }] }),
  ],
  preview: { select: { title: 'text' } },
};

export const massnahme = defineType({
  name: 'massnahme',
  title: 'Maßnahme',
  type: 'document',
  description: 'Politik-Vorhaben, sachlich beschrieben (z. B. „Bau neuer Gaskraftwerke“).',
  fields: [
    defineField({ name: 'titel', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titel', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beschreibung',
      title: 'Beschreibung (sachlich, wertneutral)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Vorgeschlagen', value: 'vorgeschlagen' },
          { title: 'Laufend', value: 'laufend' },
          { title: 'Beschlossen', value: 'beschlossen' },
          { title: 'Gestoppt', value: 'gestoppt' },
        ],
      },
    }),
    defineField({
      name: 'verantwortlich',
      title: 'Verantwortliche Akteure',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'akteur' }] }],
    }),
    defineField({
      name: 'zeitachse',
      title: 'Zeitachse',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'datum', title: 'Datum', type: 'date' }),
            defineField({ name: 'ereignis', title: 'Ereignis', type: 'string' }),
            defineField({ name: 'quelle', title: 'Quelle', type: 'reference', to: [{ type: 'quelle' }] }),
          ],
          preview: { select: { title: 'ereignis', subtitle: 'datum' } },
        },
      ],
    }),
    defineField({ name: 'proArgumente', title: 'Pro-Argumente (belegt)', type: 'array', of: [proContraPunkt] }),
    defineField({ name: 'contraArgumente', title: 'Contra-Argumente (belegt)', type: 'array', of: [proContraPunkt] }),
    defineField({
      name: 'quellen',
      title: 'Quellen',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'quelle' }] }],
    }),
  ],
  preview: { select: { title: 'titel', subtitle: 'status' } },
});
