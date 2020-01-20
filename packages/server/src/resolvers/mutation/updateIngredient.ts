import { update } from '../../database/ingredients'
import { UpdateIngredientPayload } from '../../typings/generated'

const updateIngredient = async (
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
