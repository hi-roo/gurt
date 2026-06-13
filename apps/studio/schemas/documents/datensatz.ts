import { defineField, defineType } from 'sanity';

export const datensatz = defineType({
  name: 'datensatz',
  title: 'Datensatz',
  type: 'document',
  fields: [
    defineField({ name: 'titel', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'quelle',
      title: 'Quelle',
      type: 'reference',
      to: [{ type: 'quelle' }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'lizenz', title: 'Lizenz', type: 'string' }),
    defineField({ name: 'abgerufenAm', title: 'Abgerufen am', type: 'datetime' }),
    defineField({
      name: 'spalten',
      title: 'Spalten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name (Feldschlüssel)', type: 'string' }),
            defineField({
              name: 'label',
              title: 'Label (lesbarer Spaltenkopf)',
              description: 'Überschrift im barrierefreien Tabellen-Fallback. Ohne Angabe wird der Feldschlüssel (Name) gezeigt.',
              type: 'string',
            }),
            defineField({
              name: 'typ',
              title: 'Typ',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'string' },
                  { title: 'Zahl', value: 'number' },
                  { title: 'Datum', value: 'date' },
                  { title: 'Boolean', value: 'boolean' },
                ],
              },
            }),
            defineField({ name: 'einheit', title: 'Einheit', type: 'string' }),
            defineField({ name: 'beschreibung', title: 'Beschreibung', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'einheit' } },
        },
      ],
    }),
    defineField({
      name: 'datenJson',
      title: 'Daten (JSON)',
      description: 'Kleine Datensätze inline als JSON-Array von Objekten. Größere als Datei anhängen.',
      type: 'text',
      rows: 8,
    }),
    defineField({ name: 'datei', title: 'Datei (CSV/JSON)', type: 'file' }),
    defineField({
      name: 'provenienz',
      title: 'Provenienz',
      description: 'Wie wurde der Datensatz aus der Quelle abgeleitet/transformiert?',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: { select: { title: 'titel' } },
});
