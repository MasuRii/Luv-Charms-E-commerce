import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Luv\'s Charms',
    }),
    defineField({
      name: 'featuredProductsLimit',
      title: 'Featured Products Limit',
      description: 'Maximum number of featured products to show on the home page (1-10)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Configure your site settings here',
      }
    },
  },
})