import { getAll } from '../../database/categories'
import { CategoryData } from '../../typings/generated'

const listCategories = async (): Promise<CategoryData[]> => {
  const response = await getAll()

  const entries: CategoryData[] = []
  response.map(item => {
    entries.push({
      id: item._id.toString(),
      name: item.name,
      parent: item.parent.toString(),
    })
  })

  return entries
}

export default listCategories
