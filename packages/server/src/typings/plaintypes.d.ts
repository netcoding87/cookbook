import { CreateRecipePayload, IngredientData, RecipeData } from './generated'

export type PlainIngredientData = Omit<IngredientData, 'measure'> & {
  measure: string
}

export type PlainRecipeData = Omit<
  Omit<RecipeData, 'category'>,
  'ingredients'
> & {
  category: string
} & {
  ingredients: PlainIngredientData[]
}

export type PlainCreateRecipePayload = Omit<CreateRecipePayload, 'data'> & {
  data: PlainRecipeData
}
