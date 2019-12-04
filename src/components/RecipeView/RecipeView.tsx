import React from 'react'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import NoImage from '../../assets/camera.png'
import { ImageData, RecipeData } from '../../interfaces'
import Layout from '../Layout'
import Rating from '../Rating'

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

  const imageSrc = imageData
    ? imageData.length > 0
      ? imageData[0].image
      : NoImage
    : ''

  return (
    <Layout>
      <h1>{data.title}</h1>
      {data.subtitle && <div>{data.subtitle}</div>}
      <div>
        <Rating rating={data.ranking} readonly /> | Schwierigkeit: Mittel
      </div>
      <hr />
      <img src={imageSrc} height="240" alt={data.title} />
      <hr />
      <Link to={`/recipe/${id}/edit`}>
        <Button variant="outline-primary">Edit</Button>
      </Link>
      <Button variant="outline-secondary">Delete</Button>
    </Layout>
  )
}

export default RecipeView
