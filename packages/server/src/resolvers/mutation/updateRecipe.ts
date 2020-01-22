import { update } from '../../database/recipes'
import { MutationUpdateRecipeArgs, ResolverFn, UpdateRecipePayload } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

type UpdateRecipeResolver = ResolverFn<
  UpdateRecipePayload,
  {},
  ContextType,
  MutationUpdateRecipeArgs
>

const updateRecipe: UpdateRecipeResolver = async (
  root,
  { input },
  ctx
): Promise<UpdateRecipePayload> => {
  const number = await update({
    _id: input.id,
    title: input.title,
    subtitle: input.subtitle ? input.subtitle : undefined,
    tags: input.tags ? input.tags : undefined,
    ranking: input.ranking,
    servings: input.servings ? input.servings : undefined,
    difficulty: input.difficulty,
    preparationTime: input.preparationTime ? input.preparationTime : undefined,
    cookingTime: input.cookingTime ? input.cookingTime : undefined,
    restTime: input.restTime ? input.restTime : undefined,
    preparations: input.preparations ? input.preparations : undefined,
    source: input.source ? input.source : undefined,
    category: input.category,
  })
  return {
    data: number > 0,
  }
}

export default updateRecipe
