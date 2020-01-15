import { getForRecipe } from '../../database/images'
import { ImageData } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

const listImage = async (
  root,
  params,
  ctx: ContextType
): Promise<ImageData | null> => {
  const image = await getForRecipe(params.recipeId)
  return image
    ? {
        id: image._id,
        image: image.image,
        recipe: image.recipe,
      }
    : null
}

export default listImage
