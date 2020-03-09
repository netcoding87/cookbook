import { getAll, getById as getRecipeById } from '../../database/recipes'
import { QueryRecipeArgs, QueryRecipesArgs, ResolverFn } from '../../typings/generated'
import { PlainRecipeData } from '../../typings/plaintypes'

type ListRecipesResolver = ResolverFn<
  PlainRecipeData[],
  {},
  {},
  QueryRecipesArgs
>

export const listRecipes: ListRecipesResolver = async (
  root,
  { filter }
): Promise<PlainRecipeData[]> => {
  let recipes = await getAll()

  if (filter) {
    recipes = recipes.filter(recipe => {
      if (
        recipe.title.toLowerCase().includes(filter.toLowerCase()) ||
        recipe.subtitle?.toLowerCase().includes(filter.toLowerCase()) ||
        recipe.tags?.toLowerCase().includes(filter.toLowerCase())
      ) {
        return recipe
      }
    })
  }

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
    ingredients: recipe.ingredients
      ? recipe.ingredients.map(ingredient => ({
          amount: ingredient.amount,
          ingredient: ingredient.ingredient,
          measure: ingredient.measure,
        }))
      : [],
  }))
}

type ListRecipeResolver = ResolverFn<
  PlainRecipeData | null,
  {},
  {},
  QueryRecipeArgs
>

export const listRecipe: ListRecipeResolver = async (
  root,
  { id }
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
        ingredients: recipe.ingredients
          ? recipe.ingredients.map(ingredient => ({
              amount: ingredient.amount,
              ingredient: ingredient.ingredient,
              measure: ingredient.measure,
            }))
          : [],
      }
    : null
}
