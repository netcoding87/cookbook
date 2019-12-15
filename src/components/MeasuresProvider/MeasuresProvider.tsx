import React from 'react'
import useSWR from 'swr'

import { CategoryData, MeasureData } from '../../interfaces'

interface StaticDataProviderData {
  categories: CategoryData[]
  measures: MeasureData[]
}

const MeasuresContext = React.createContext<StaticDataProviderData>({
  categories: [],
  measures: [],
})

const MeasuresProvider: React.FC = ({ children }) => {
  const { data: measures } = useSWR<MeasureData[]>(
    `http://localhost:4000/measures`,
    url => fetch(url).then(response => response.json())
  )

  const { data: categories } = useSWR<CategoryData[]>(
    `http://localhost:4000/categories`,
    url => fetch(url).then(response => response.json())
  )

  if (!measures || !categories) {
    return <div>Loading...</div>
  }

  return (
    <MeasuresContext.Provider
      value={{ categories: categories, measures: measures }}
    >
      {children}
    </MeasuresContext.Provider>
  )
}

export const useMeasures = () => {
  return React.useContext(MeasuresContext)
}

export default MeasuresProvider
