import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Redaktioneller Fließtext (Portable Text) mit eingebetteten Gurt-Blöcken:
 * Visualisierung, Datentabelle, Zitat, Quellen-Note, Vergleich.
 */
export const body = defineType({
  name: 'body',
  title: 'Inhalt',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Absatz', value: 'normal' },
        { title: 'Zwischentitel', value: 'h2' },
        { title: 'Unterüberschrift', value: 'h3' },
        { title: 'Zitat', value: 'blockquote' },
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [defineField({ name: 'href', title: 'URL', type: 'url' })],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt-Text', type: 'string' })],
    }),
    defineArrayMember({
      type: 'object',
      name: 'visualisierungBlock',
      title: 'Visualisierung',
      fields: [
        defineField({
          name: 'visualisierung',
          title: 'Visualisierung',
          type: 'reference',
          to: [{ type: 'visualisierung' }],
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: { title: 'visualisierung.titel', subtitle: 'visualisierung.typ' },
        prepare: ({ title, subtitle }) => ({ title: title ?? 'Visualisierung', subtitle: `📊 ${subtitle ?? ''}` }),
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'datentabelleBlock',
      title: 'Datentabelle',
      fields: [
        defineField({
          name: 'datensatz',
          title: 'Datensatz',
          type: 'reference',
          to: [{ type: 'datensatz' }],
          validation: (rule) => rule.required(),
        }),
        defineField({ name: 'caption', title: 'Bildunterschrift', type: 'string' }),
      ],
      preview: { select: { title: 'datensatz.titel' }, prepare: ({ title }) => ({ title: `▦ ${title ?? 'Datentabelle'}` }) },
    }),
    defineArrayMember({
      type: 'object',
      name: 'zitatBlock',
      title: 'Zitat',
      fields: [
        defineField({ name: 'zitat', title: 'Zitat', type: 'text', rows: 3, validation: (rule) => rule.required() }),
        defineField({ name: 'quelle', title: 'Quelle', type: 'reference', to: [{ type: 'quelle' }] }),
      ],
      preview: { select: { title: 'zitat' }, prepare: ({ title }) => ({ title: `„${title ?? ''}"` }) },
    }),
    defineArrayMember({
      type: 'object',
      name: 'quellenNote',
      title: 'Quellen-Note',
      fields: [
        defineField({ name: 'text', title: 'Hinweis', type: 'text', rows: 2 }),
        defineField({ name: 'quelle', title: 'Quelle', type: 'reference', to: [{ type: 'quelle' }] }),
      ],
      preview: { select: { title: 'text' }, prepare: ({ title }) => ({ title: `※ ${title ?? 'Quellen-Note'}` }) },
    }),
    defineArrayMember({
      type: 'object',
      name: 'vergleichBlock',
      title: 'Vergleich',
      fields: [
        defineField({ name: 'titel', title: 'Titel', type: 'string' }),
        defineField({ name: 'einleitung', title: 'Einleitung', type: 'text', rows: 2 }),
        defineField({ name: 'links', title: 'Linke Seite (Maßnahme)', type: 'reference', to: [{ type: 'massnahme' }] }),
        defineField({ name: 'rechts', title: 'Rechte Seite (Maßnahme)', type: 'reference', to: [{ type: 'massnahme' }] }),
      ],
      preview: { select: { title: 'titel' }, prepare: ({ title }) => ({ title: `⇄ ${title ?? 'Vergleich'}` }) },
    }),
  ],
});
