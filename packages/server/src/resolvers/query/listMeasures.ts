import { getAll } from '../../database/measures'
import { MeasureData } from '../../typings/generated'

const listMeasures = async (): Promise<MeasureData[]> => {
  const response = await getAll()

  const entries: MeasureData[] = []
  response.map(item => {
    entries.push({
      id: item._id,
      name: item.name,
    })
  })

  return entries
}

export default listMeasures
