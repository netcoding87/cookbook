import { getForRecipe } from '../../database/images'
import { ImageData, QueryImageArgs, ResolverFn } from '../../typings/generated'

type ListImageResolver = ResolverFn<ImageData | null, {}, {}, QueryImageArgs>

const listImage: ListImageResolver = async (
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
