import React from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'

import { RecipeData } from '../../interfaces'
import Layout from '../Layout'

const RecipeView: React.FC = () => {
  const { id } = useParams()
  const { data } = useSWR<RecipeData>(
    `http://localhost:4000/recipes/${id}`,
    url => fetch(url).then(response => response.json())
  )

  const { data: imageData } = useSWR<ImageData[]>(
    `http://localhost:4000/images?recipeId=${id}`,
    url => fetch(url).then(response => response.json())
  )

  if (!data) {
    return <div>Loading...</div>
  }

  if (!imageData) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      View recipe with {id}: Title: {data.title}
    </Layout>
  )
}

export default RecipeView
