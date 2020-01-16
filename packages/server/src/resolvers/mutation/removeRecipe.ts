import { remove } from '../../database/recipes'

const removeRecipe = async (root, { input }, ctx) => {
  const number = await remove(input.id)
  return {
    data: number > 0,
  }
}

export default removeRecipe
