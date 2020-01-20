import { remove } from '../../database/ingredients'

const removeIngredient = async (root, { input }, ctx) => {
  const number = await remove(input.id)
  return {
    data: number > 0,
  }
}

export default removeIngredient
