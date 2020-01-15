import { update } from '../../database/images'

const updateImage = async (root, { input }, ctx) => {
  const number = await update({
    _id: input.id,
    image: input.image,
    recipe: input.recipe,
  })
  return {
    data: number > 0,
  }
}

export default updateImage
