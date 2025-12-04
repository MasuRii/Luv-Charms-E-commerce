import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './category'
import { productType } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType],
}