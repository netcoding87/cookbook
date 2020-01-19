import { update } from '../../database/recipes'
import { UpdateRecipePayload } from '../../typings/generated'

const updateRecipe = async (
  root,
  { input },
  ctx
): Promise<UpdateRecipePayload> => {
  const number = await update({
    _id: input.id,
    title: input.title,
    category: input.category,
  })
  return {
    data: number > 0,
  }
}

export default updateRecipe
