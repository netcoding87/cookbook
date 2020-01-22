import { add } from '../../database/images'
import { CreateImagePayload, MutationCreateImageArgs, ResolverFn } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

type CreateImageResolver = ResolverFn<
  CreateImagePayload,
  {},
  ContextType,
  MutationCreateImageArgs
>

const createImage: CreateImageResolver = async (root, { input }, ctx) => {
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
