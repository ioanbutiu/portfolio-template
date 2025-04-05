import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'sketches',
  title: 'Sketches',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sketchImage',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
            }),
            defineField({
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'size',
              type: 'string',
              options: {
                list: ['large', 'medium', 'small'],
              },
            }),
          ],
        }),
        defineArrayMember({
          name: 'sketchVideo',
          type: 'object',
          fields: [
            defineField({
              name: 'video',
              type: 'mux.video',
            }),
            defineField({
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'size',
              type: 'string',
              options: {
                list: ['large', 'medium', 'small'],
              },
            }),
          ],
        }),
      ],
    }),
  ],
})
