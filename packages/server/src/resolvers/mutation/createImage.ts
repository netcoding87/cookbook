import { add } from '../../database/images'
import { CreateImagePayload, MutationCreateImageArgs, ResolverFn } from '../../typings/generated'

type CreateImageResolver = ResolverFn<
  CreateImagePayload,
  {},
  {},
  MutationCreateImageArgs
>

const createImage: CreateImageResolver = async (root, { input }) => {
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
