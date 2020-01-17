import { update } from '../../database/recipes'

const updateRecipe = async (root, { input }, ctx) => {
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
