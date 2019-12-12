import React from 'react'
import useSWR from 'swr'

import { MeasureData } from '../../interfaces'

const MeasuresContext = React.createContext<MeasureData[]>([])

const MeasuresProvider: React.FC = ({ children }) => {
  const { data } = useSWR<MeasureData[]>(
    `http://localhost:4000/measures`,
    url => fetch(url).then(response => response.json())
  )

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <MeasuresContext.Provider value={data}>{children}</MeasuresContext.Provider>
  )
}

export const useMeasures = () => {
  return React.useContext(MeasuresContext)
}

export default MeasuresProvider
