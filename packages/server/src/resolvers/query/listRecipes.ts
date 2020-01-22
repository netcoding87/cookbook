import { getAll, getById as getRecipeById } from '../../database/recipes'
import { RecipeData } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

export type RecipeDataWithoutNestedData = Omit<
  Omit<RecipeData, 'category'>,
  'ingredients'
> & {
  category: string
}

export const listRecipes = async (): Promise<RecipeDataWithoutNestedData[]> => {
  const recipes = await getAll()

  return recipes.map(recipe => ({
    id: recipe._id,
    title: recipe.title,
    subtitle: recipe.subtitle,
    tags: recipe.tags,
    ranking: recipe.ranking,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    preparationTime: recipe.preparationTime,
    cookingTime: recipe.cookingTime,
    restTime: recipe.restTime,
    preparations: recipe.preparations,
    source: recipe.source,
    category: recipe.category,
  }))
}

export const listRecipe = async (
  root,
  params,
  ctx: ContextType
): Promise<RecipeDataWithoutNestedData | null> => {
  const recipe = await getRecipeById(params.id)

  return recipe
    ? {
        id: recipe._id,
        title: recipe.title,
        subtitle: recipe.subtitle,
        tags: recipe.tags,
        ranking: recipe.ranking,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        preparationTime: recipe.preparationTime,
        cookingTime: recipe.cookingTime,
        restTime: recipe.restTime,
        preparations: recipe.preparations,
        source: recipe.source,
        category: recipe.category,
      }
    : null
}
