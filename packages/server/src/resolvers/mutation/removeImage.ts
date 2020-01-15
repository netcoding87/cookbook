import { remove } from '../../database/images'

const removeImage = async (root, { input }, ctx) => {
  const number = await remove(input.id)
  return {
    data: number > 0,
  }
}

export default removeImage
