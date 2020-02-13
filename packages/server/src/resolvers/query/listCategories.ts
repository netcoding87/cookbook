import { getAll } from '../../database/categories'
import { CategoryData } from '../../typings/generated'

const listCategories = async (): Promise<CategoryData[]> => {
  const response = await getAll()

  return response.map(item => ({
    id: item._id,
    name: item.name,
    parent: item.parent,
  }))
}

export default listCategories
