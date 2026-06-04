import { defineField, defineType } from 'sanity';

export const beitrag = defineType({
  name: 'beitrag',
  title: 'Beitrag',
  type: 'document',
  fields: [
    defineField({ name: 'titel', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titel', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'standfirst', title: 'Standfirst / Vorspann', type: 'text', rows: 3 }),
    defineField({
      name: 'autoren',
      title: 'Autor:innen',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'autor' }] }],
    }),
    defineField({
      name: 'ressort',
      title: 'Ressort',
      description: 'Feste Top-Ebene der Navigation (genau eines). Themen bleiben als feine Tags daneben.',
      type: 'string',
      // Gespiegelt zu apps/web/content/ressorts.ts (RESSORTS) — beide synchron halten.
      options: {
        list: [
          { title: 'Finanzen', value: 'finanzen' },
          { title: 'Wirtschaft', value: 'wirtschaft' },
          { title: 'Soziales', value: 'soziales' },
          { title: 'Umwelt', value: 'umwelt' },
          { title: 'Inneres', value: 'inneres' },
          { title: 'Verteidigung', value: 'verteidigung' },
          { title: 'Wohnen', value: 'wohnen' },
          { title: 'Parlament', value: 'parlament' },
        ],
      },
    }),
    defineField({
      name: 'themen',
      title: 'Themen (Tags)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'thema' }] }],
    }),
    defineField({
      name: 'akteure',
      title: 'Erwähnte Akteure',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'akteur' }] }],
    }),
    defineField({
      name: 'massnahmen',
      title: 'Behandelte Maßnahmen',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'massnahme' }] }],
    }),
    defineField({ name: 'body', title: 'Inhalt', type: 'body' }),
    defineField({
      name: 'methodik',
      title: 'Methodik-Hinweis',
      description: 'Datenstand, Auswahl, Grenzen (Pflicht bei Veröffentlichung — siehe docs/08).',
      type: 'text',
      rows: 4,
    }),
    defineField({ name: 'veroeffentlicht', title: 'Veröffentlicht am', type: 'datetime' }),
    defineField({ name: 'aktualisiert', title: 'Aktualisiert am', type: 'datetime' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Entwurf', value: 'entwurf' },
          { title: 'Im Review', value: 'review' },
          { title: 'Veröffentlicht', value: 'veroeffentlicht' },
        ],
        layout: 'radio',
      },
      initialValue: 'entwurf',
    }),
  ],
  preview: { select: { title: 'titel', subtitle: 'status' } },
  orderings: [
    {
      title: 'Veröffentlicht (neueste zuerst)',
      name: 'pubDesc',
      by: [{ field: 'veroeffentlicht', direction: 'desc' }],
    },
  ],
});
