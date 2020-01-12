import { getAll } from '../../database/categories'

type Category = { id: number; name: string; parent: number }

const listCategories = async () => {
  const response = await getAll()

  const entries: Category[] = []
  response.map(item => {
    entries.push({
      id: item._id,
      name: item.name,
      parent: item.parent,
    })
  })

  return entries
}

export default listCategories
