import { update } from '../../database/images'
import { MutationUpdateImageArgs, ResolverFn, UpdateImagePayload } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

type UpdateImageResolver = ResolverFn<
  UpdateImagePayload,
  {},
  ContextType,
  MutationUpdateImageArgs
>

const updateImage: UpdateImageResolver = async (
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
