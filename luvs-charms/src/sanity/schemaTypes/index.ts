import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './category'
import { productType } from './product'
import { siteSettingsType } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType, siteSettingsType],
}