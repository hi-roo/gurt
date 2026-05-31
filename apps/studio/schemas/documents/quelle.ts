import { defineField, defineType } from 'sanity';

export const quelle = defineType({
  name: 'quelle',
  title: 'Quelle',
  type: 'document',
  description: 'Jede Aussage/Zahl referenziert eine Quelle (siehe docs/08-methodology.md).',
  fields: [
    defineField({ name: 'titel', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'herausgeber', title: 'Herausgeber', type: 'string' }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'typ',
      title: 'Quellentyp',
      type: 'string',
      options: {
        list: [
          { title: 'Primärdokument', value: 'primaerdokument' },
          { title: 'Datensatz', value: 'datensatz' },
          { title: 'Aussage / Zitat', value: 'aussage' },
          { title: 'Studie', value: 'studie' },
          { title: 'Medienbericht', value: 'medienbericht' },
        ],
      },
    }),
    defineField({ name: 'abgerufenAm', title: 'Abgerufen am', type: 'datetime' }),
    defineField({ name: 'lizenz', title: 'Lizenz', type: 'string' }),
    defineField({ name: 'archivUrl', title: 'Archiv-URL (z. B. Wayback)', type: 'url' }),
  ],
  preview: { select: { title: 'titel', subtitle: 'herausgeber' } },
});
