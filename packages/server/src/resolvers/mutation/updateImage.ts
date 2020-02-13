import { update } from '../../database/images'
import { MutationUpdateImageArgs, ResolverFn, UpdateImagePayload } from '../../typings/generated'

type UpdateImageResolver = ResolverFn<
  UpdateImagePayload,
  {},
  {},
  MutationUpdateImageArgs
>

const updateImage: UpdateImageResolver = async (
  root,
  { input }
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
