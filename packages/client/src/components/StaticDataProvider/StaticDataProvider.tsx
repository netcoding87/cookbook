import React from 'react'
import { CategoryData, MeasureData } from '../../interfaces'
import { useCategoriesQuery, useMeasuresQuery } from '../../typings/generated.d'


interface StaticData {
  categories: CategoryData[]
  measures: MeasureData[]
}

const StaticDataContext = React.createContext<StaticData>({
  categories: [],
  measures: [],
})

const StaticDataProvider: React.FC = ({ children }) => {
  const { data: measures } = useMeasuresQuery()

  const { data: categories } = useCategoriesQuery()

  if (!measures || !categories) {
    return <div>Loading...</div>
  }

  return (
    <StaticDataContext.Provider
      value={{ categories: categories.categories, measures: measures.measures }}
    >
      {children}
    </StaticDataContext.Provider>
  )
}

export const useStaticData = () => {
  return React.useContext(StaticDataContext)
}

export default StaticDataProvider
