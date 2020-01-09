import React from 'react'
import useSWR from 'swr'

import { CategoryData, MeasureData } from '../../interfaces'

interface StaticData {
  categories: CategoryData[]
  measures: MeasureData[]
}

const StaticDataContext = React.createContext<StaticData>({
  categories: [],
  measures: [],
})

const StaticDataProvider: React.FC = ({ children }) => {
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
    <StaticDataContext.Provider
      value={{ categories: categories, measures: measures }}
    >
      {children}
    </StaticDataContext.Provider>
  )
}

export const useStaticData = () => {
  return React.useContext(StaticDataContext)
}

export default StaticDataProvider
