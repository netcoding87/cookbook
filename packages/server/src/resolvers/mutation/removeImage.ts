import { remove } from '../../database/images'
import { MutationRemoveImageArgs, RemoveImagePayload, ResolverFn } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

type RemoveImageResolver = ResolverFn<
  RemoveImagePayload,
  {},
  ContextType,
  MutationRemoveImageArgs
>

const removeImage: RemoveImageResolver = async (root, { input }, ctx) => {
  const number = await remove(input.id)
  return {
    data: number > 0,
  }
}

export default removeImage
