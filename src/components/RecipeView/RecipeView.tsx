import React from 'react'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { RecipeData } from '../../interfaces'
import Layout from '../Layout'
import Rating from '../Rating'
import RecipeImage from '../RecipeImage'

const RecipeView: React.FC = () => {
  const { id } = useParams()
  const { data } = useSWR<RecipeData>(
    `http://localhost:4000/recipes/${id}`,
    url => fetch(url).then(response => response.json())
  )

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <h1>{data.title}</h1>
      {data.subtitle && <div>{data.subtitle}</div>}
      <div>
        <Rating rating={data.ranking} readonly /> | Schwierigkeit: Mittel
      </div>
      <hr />
      <RecipeImage id={id!} title={data.title} height="150px" />
      <hr />
      <Link to={`/recipe/${id}/edit`}>
        <Button variant="outline-primary">Edit</Button>
      </Link>
      <Button variant="outline-secondary">Delete</Button>
    </Layout>
  )
}

export default RecipeView
