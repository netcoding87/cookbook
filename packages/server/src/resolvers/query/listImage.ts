import { getForRecipe } from '../../database/images'
import { ImageData, QueryResolvers } from '../../typings/generated'

type QueryImageResolver = QueryResolvers['image']

const listImage: QueryImageResolver = async (
  root,
  { recipeId }
): Promise<ImageData | null> => {
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
