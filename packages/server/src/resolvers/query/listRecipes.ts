import { getAll, getById as getRecipeById } from '../../database/recipes'
import { QueryRecipeArgs } from '../../typings/generated'
import { PlainRecipeData } from '../../typings/plaintypes'

export const listRecipes = async (): Promise<PlainRecipeData[]> => {
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
  { id }: QueryRecipeArgs
): Promise<PlainRecipeData | null> => {
  const recipe = await getRecipeById(id)

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
