import { defineField, defineType } from 'sanity';

export const position = defineType({
  name: 'position',
  title: 'Position',
  type: 'document',
  description: 'Akteur × Maßnahme × Haltung — speist die Positions-Matrix.',
  fields: [
    defineField({
      name: 'akteur',
      title: 'Akteur',
      type: 'reference',
      to: [{ type: 'akteur' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'massnahme',
      title: 'Maßnahme',
      type: 'reference',
      to: [{ type: 'massnahme' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'haltung',
      title: 'Haltung',
      type: 'string',
      options: {
        list: [
          { title: 'Dafür', value: 'dafuer' },
          { title: 'Dagegen', value: 'dagegen' },
          { title: 'Differenziert', value: 'differenziert' },
          { title: 'Unklar / keine Angabe', value: 'unklar' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'zitat', title: 'Zitat / Beleg', type: 'text', rows: 3 }),
    defineField({
      name: 'quelle',
      title: 'Quelle',
      type: 'reference',
      to: [{ type: 'quelle' }],
      validation: (rule) => rule.required().error('Eine Position ohne Quelle ist nicht zulässig.'),
    }),
    defineField({ name: 'datum', title: 'Stand vom', type: 'date' }),
  ],
  preview: {
    select: { akteur: 'akteur.name', massnahme: 'massnahme.titel', haltung: 'haltung' },
    prepare({ akteur, massnahme, haltung }) {
      return {
        title: `${akteur ?? '?'} → ${massnahme ?? '?'}`,
        subtitle: haltung,
      };
    },
  },
});
