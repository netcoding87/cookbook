import { add } from '../../database/ingredients'
import {
  MutationCreateIngredientArgs,
  ResolverFn,
} from '../../typings/generated'
import { PlainCreateIngredientPayload } from '../../typings/plaintypes'
import { ContextType } from '../../utils/createContext'

type CreateIngredientResolver = ResolverFn<
  PlainCreateIngredientPayload,
  {},
  ContextType,
  MutationCreateIngredientArgs
>

const createIngredient: CreateIngredientResolver = async (
  root,
  { input }
): Promise<PlainCreateIngredientPayload> => {
  const ingredient = await add(
    input.amount,
    input.ingredient,
    input.measure,
    input.recipe
  )

  return {
    data: {
      id: ingredient._id,
      amount: ingredient.amount,
      ingredient: ingredient.ingredient,
      measure: ingredient.measure,
    },
  }
}

export default createIngredient
