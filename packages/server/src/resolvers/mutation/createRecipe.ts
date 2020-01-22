import { getById } from '../../database/categories'
import { add } from '../../database/recipes'
import { CreateRecipePayload, MutationCreateRecipeArgs, ResolverFn } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

type CreateRecipeResolver = ResolverFn<
  CreateRecipePayload,
  {},
  ContextType,
  MutationCreateRecipeArgs
>

const createRecipe: CreateRecipeResolver = async (
  root,
  { input },
  ctx
): Promise<CreateRecipePayload> => {
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
    input.source ? input.source : undefined
  )
  const category = await getById(recipe.category)

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
      category: {
        id: category ? category._id : '',
        name: category ? category.name : '',
        parent: category ? category.parent : '',
      },
      ingredients: [],
    },
  }
}

export default createRecipe
