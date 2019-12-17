import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

import { RecipeData } from '../../interfaces'
import Rating from '../Rating'
import RecipeImage from '../RecipeImage'
import { ImageContainer, RecipeTitle } from './RecipeCard.styles'

interface RecipeCardProps {
  recipe: RecipeData
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Col xs={6} sm={3} xl={2}>
      <Link to={`/recipe/${recipe.id}`}>
        <Card bg="light">
          <ImageContainer>
            <RecipeImage id={recipe.id.toString()} title={recipe.title} fluid />
          </ImageContainer>
          <Card.Body>
            <Rating rating={recipe.ranking} size="xs" readonly />
            <RecipeTitle>{recipe.title}</RecipeTitle>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}

export default RecipeCard
