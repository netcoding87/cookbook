import { add } from '../../database/ingredients'
import { getById } from '../../database/measures'
import { CreateIngredientPayload, MutationCreateIngredientArgs, ResolverFn } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

type CreateIngredientResolver = ResolverFn<
  CreateIngredientPayload,
  {},
  ContextType,
  MutationCreateIngredientArgs
>

const createIngredient: CreateIngredientResolver = async (
  root,
  { input },
  ctx
): Promise<CreateIngredientPayload> => {
  const ingredient = await add(input.amount, input.ingredient, input.measure)
  const measure = await getById(parseInt(ingredient.measure))
  return {
    data: {
      id: ingredient._id,
      amount: ingredient.amount,
      ingredient: ingredient.ingredient,
      measure: {
        id: measure ? measure._id.toString() : '',
        name: measure ? measure.name : '',
      },
    },
  }
}

export default createIngredient
