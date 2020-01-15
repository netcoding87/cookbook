import { add } from '../../database/recipes'
import { CreateRecipePayload } from '../../typings/generated'

const createRecipe = async (
  root,
  { input },
  ctx
): Promise<CreateRecipePayload> => {
  const recipe = await add(input.title, input.category)
  return {
    data: {
      id: recipe._id,
      title: recipe.title,
      ranking: 5,
      difficulty: 0,
      category: recipe.category,
    },
  }
}

export default createRecipe
