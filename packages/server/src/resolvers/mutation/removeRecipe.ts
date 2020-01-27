import { remove } from '../../database/recipes'
import {
  MutationRemoveRecipeArgs,
  RemoveRecipePayload,
  ResolverFn,
} from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

type RemoveRecipeResolver = ResolverFn<
  RemoveRecipePayload,
  {},
  ContextType,
  MutationRemoveRecipeArgs
>

const removeRecipe: RemoveRecipeResolver = async (root, { input }) => {
  const number = await remove(input.id)
  return {
    data: number > 0,
  }
}

export default removeRecipe
