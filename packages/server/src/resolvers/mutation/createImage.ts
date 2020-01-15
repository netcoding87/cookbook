import { add } from '../../database/images'

const createImage = async (root, { input }, ctx) => {
  const image = await add(input.image, input.recipe)
  return {
    data: {
      id: image._id,
      image: image.image,
      recipe: image.recipe,
    },
  }
}

export default createImage
