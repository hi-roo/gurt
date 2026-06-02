import { defineField, defineType } from 'sanity';

/**
 * Beitrags-Brief / Themen-Idee — interner Redaktions-Workflow („Themen-Radar").
 * Wird vom Skript `scripts/themen-radar.ts` aus Signalen (z. B. Bundestag-DIP) als
 * Vorschlag erzeugt und in der Redaktion geprüft/weiterentwickelt. KEIN öffentlicher
 * Inhalt — das Frontend rendert `idee` nicht. Veröffentlichung bleibt redaktionell (docs/07).
 */
export const idee = defineType({
  name: 'idee',
  title: 'Beitrags-Idee (Themen-Radar)',
  type: 'document',
  fields: [
    defineField({ name: 'titel', title: 'Arbeitstitel', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'vorschlag',
      options: {
        list: [
          { title: 'Vorschlag (Radar)', value: 'vorschlag' },
          { title: 'In Prüfung', value: 'in-pruefung' },
          { title: 'In Arbeit', value: 'in-arbeit' },
          { title: 'Verworfen', value: 'verworfen' },
          { title: 'Umgesetzt', value: 'umgesetzt' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'themenfeld', title: 'Themenfeld', type: 'string' }),
    defineField({
      name: 'leitfrage',
      title: 'Leitfrage (Vorschlag)',
      description: 'Die eine Frage, die der Beitrag beantworten soll.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'anlass',
      title: 'Anlass / Signal',
      description: 'Woraus der Radar diese Idee abgeleitet hat (z. B. neuer DIP-Vorgang).',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'quelle',
      title: 'Signal-Quelle',
      type: 'object',
      fields: [
        defineField({ name: 'titel', title: 'Titel', type: 'string' }),
        defineField({ name: 'url', title: 'URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'kandidatenQuellen',
      title: 'Kandidaten-Datenquellen',
      description: 'Wo echte, bequellte Zahlen zu finden sind (Recherche-Startpunkte).',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'vizIdee', title: 'Visualisierungs-Idee', type: 'string' }),
    defineField({
      name: 'radarQuelle',
      title: 'Radar-Signalquelle',
      type: 'string',
      readOnly: true,
    }),
    defineField({ name: 'entdecktAm', title: 'Entdeckt am', type: 'date', readOnly: true }),
  ],
  orderings: [
    { name: 'neueste', title: 'Neueste zuerst', by: [{ field: 'entdecktAm', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'titel', status: 'status', themenfeld: 'themenfeld' },
    prepare: ({ title, status, themenfeld }) => ({
      title: title ?? 'Idee',
      subtitle: `💡 ${themenfeld ?? '—'} · ${status ?? 'vorschlag'}`,
    }),
  },
});
