import { update } from '../../database/ingredients'
import { MutationUpdateIngredientArgs, ResolverFn, UpdateIngredientPayload } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

type UpdateIngredientResolver = ResolverFn<
  UpdateIngredientPayload,
  {},
  ContextType,
  MutationUpdateIngredientArgs
>

const updateIngredient: UpdateIngredientResolver = async (
  root,
  { input },
  ctx
): Promise<UpdateIngredientPayload> => {
  const number = await update({
    _id: input.id,
    amount: input.amount,
    ingredient: input.ingredient,
    measure: input.measure,
  })
  return {
    data: number > 0,
  }
}

export default updateIngredient
