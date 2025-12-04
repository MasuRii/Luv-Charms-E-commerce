import { defineType, defineField } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Price (PHP)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stockStatus',
      title: 'Stock Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Stock', value: 'inStock' },
          { title: 'Out of Stock', value: 'outOfStock' },
          { title: 'Pre-Order', value: 'preOrder' },
        ],
        layout: 'radio',
      },
      initialValue: 'inStock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      description: 'Show this product in the featured section on the home page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPopular',
      title: 'Most Popular',
      description: 'Mark this product as most popular (will appear first in featured and show a badge)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      price: 'price',
      stockStatus: 'stockStatus',
      isFeatured: 'isFeatured',
      isPopular: 'isPopular',
    },
    prepare(selection) {
      const { title, media, price, stockStatus, isFeatured, isPopular } = selection
      const badges = []
      if (isPopular) badges.push('🔥 Popular')
      if (isFeatured) badges.push('⭐ Featured')
      const badgeText = badges.length > 0 ? ` [${badges.join(', ')}]` : ''
      return {
        title: `${title}${badgeText}`,
        subtitle: `₱${price} - ${stockStatus}`,
        media: media,
      }
    },
  },
})