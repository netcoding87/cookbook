import { remove } from '../../database/images'
import { MutationRemoveImageArgs, RemoveImagePayload, ResolverFn } from '../../typings/generated'

type RemoveImageResolver = ResolverFn<
  RemoveImagePayload,
  {},
  {},
  MutationRemoveImageArgs
>

const removeImage: RemoveImageResolver = async (root, { input }) => {
  const number = await remove(input.id)
  return {
    data: number > 0,
  }
}

export default removeImage
