import { add } from '../../database/recipes'
import { MutationCreateRecipeArgs, ResolverFn } from '../../typings/generated'
import { PlainCreateRecipePayload } from '../../typings/plaintypes'

type CreateRecipeResolver = ResolverFn<
  PlainCreateRecipePayload,
  {},
  {},
  MutationCreateRecipeArgs
>

const createRecipe: CreateRecipeResolver = async (
  root,
  { input }
): Promise<PlainCreateRecipePayload> => {
  const recipe = await add(
    input.title,
    input.ranking,
    input.difficulty,
    input.category,
    input.subtitle ? input.subtitle : undefined,
    input.tags ? input.tags : undefined,
    input.servings ? input.servings : undefined,
    input.preparationTime ? input.preparationTime : undefined,
    input.cookingTime ? input.cookingTime : undefined,
    input.restTime ? input.restTime : undefined,
    input.preparations ? input.preparations : undefined,
    input.source ? input.source : undefined,
    input.ingredients ? input.ingredients : undefined
  )

  return {
    data: {
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
    },
  }
}

export default createRecipe
