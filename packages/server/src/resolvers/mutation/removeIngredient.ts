import { remove } from '../../database/ingredients'
import { MutationRemoveIngredientArgs, RemoveIngredientPayload, ResolverFn } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

type RemoveIngredientResolver = ResolverFn<
  RemoveIngredientPayload,
  {},
  ContextType,
  MutationRemoveIngredientArgs
>

const removeIngredient: RemoveIngredientResolver = async (
  root,
  { input },
  ctx
) => {
  const number = await remove(input.id)
  return {
    data: number > 0,
  }
}

export default removeIngredient
