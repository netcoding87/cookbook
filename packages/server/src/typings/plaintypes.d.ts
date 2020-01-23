import { CreateIngredientPayload, CreateRecipePayload, IngredientData, RecipeData } from './generated'

export type PlainIngredientData = Omit<IngredientData, 'measure'> & {
  measure: string
}

export type PlainRecipeData = Omit<
  Omit<RecipeData, 'category'>,
  'ingredients'
> & {
  category: string
}

export type PlainCreateRecipePayload = Omit<CreateRecipePayload, 'data'> & {
  data: PlainRecipeData
}

export type PlainCreateIngredientPayload = Omit<
  CreateIngredientPayload,
  'data'
> & {
  data: PlainIngredientData
}
