import { getAll } from '../../database/measures'

type Measure = { id: number; name: string }

const listMeasures = async () => {
  const response = await getAll()

  const entries: Measure[] = []
  response.map(item => {
    entries.push({
      id: item._id,
      name: item.name,
    })
  })

  return entries
}

export default listMeasures
