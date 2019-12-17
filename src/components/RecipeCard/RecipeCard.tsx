import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import NoImage from '../../assets/camera.png'
import { ImageData, RecipeData } from '../../interfaces'
import Rating from '../Rating'

interface RecipeCardProps {
  recipe: RecipeData
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { data } = useSWR<ImageData[]>(
    `http://localhost:4000/images?recipeId=${recipe.id}`,
    url => fetch(url).then(response => response.json())
  )

  const imageSrc = data ? (data.length > 0 ? data[0].image : NoImage) : ''

  return (
    <Col xs={6} sm={3} xl={2}>
      <Link to={`/recipe/${recipe.id}`}>
        <Card bg="light">
          <Card.Img variant="top" src={imageSrc} />
          <Card.Body>
            <Rating rating={recipe.ranking} size="xs" readonly />
            <Card.Text>{recipe.title}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}

export default RecipeCard
