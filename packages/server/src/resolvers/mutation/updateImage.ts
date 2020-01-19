import { update } from '../../database/images'
import { UpdateImagePayload } from '../../typings/generated'

const updateImage = async (
  root,
  { input },
  ctx
): Promise<UpdateImagePayload> => {
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
