import React from 'react'
import Col from 'react-bootstrap/Col'

import { RecipeData } from '../../interfaces'
import Rating from '../Rating'
import {
  ContentContainer,
  ImageContainer,
  RecipeCardContainer,
  RecipeCardLink,
  RecipeTitle,
} from './RecipeCard.styles'
import RecipeCardImage from './RecipeCardImage'

interface RecipeCardProps {
  recipe: RecipeData
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Col xs={6} sm={3} xl={2}>
      <RecipeCardLink to={`/recipe/${recipe.id}`}>
        <RecipeCardContainer>
          <ImageContainer>
            <RecipeCardImage id={recipe.id.toString()} title={recipe.title} />
          </ImageContainer>
          <ContentContainer>
            <Rating rating={recipe.ranking} size="xs" readonly />
            <RecipeTitle>{recipe.title}</RecipeTitle>
          </ContentContainer>
        </RecipeCardContainer>
      </RecipeCardLink>
    </Col>
  )
}

export default RecipeCard
