import React from 'react'
import useSWR from 'swr'

const Dashboard: React.FC = () => {
  const { data } = useSWR('http://localhost:4000/recipes', url =>
    fetch(url).then(response => response.json())
  )

  return (
    <div>
      Dashboard
      <hr />
      {JSON.stringify(data)}
    </div>
  )
}

export default Dashboard
