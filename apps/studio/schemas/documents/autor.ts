import { defineField, defineType } from 'sanity';

export const autor = defineType({
  name: 'autor',
  title: 'Autor:in',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'rolle', title: 'Rolle', type: 'string' }),
    defineField({ name: 'bio', title: 'Kurzbio', type: 'text', rows: 3 }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-Text',
          type: 'string',
          validation: (rule) => rule.required().warning('Alt-Text ist Pflicht (Barrierefreiheit).'),
        }),
      ],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'rolle' } },
});
