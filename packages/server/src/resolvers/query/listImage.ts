import { getForRecipe } from '../../database/images'
import { ImageData } from '../../typings/generated'

const listImage = async (root, { recipeId }): Promise<ImageData | null> => {
  const image = await getForRecipe(recipeId)
  return image
    ? {
        id: image._id,
        image: image.image,
        recipe: image.recipe,
      }
    : null
}

export default listImage
