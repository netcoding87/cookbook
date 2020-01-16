import React from 'react'

import { RecipeData } from '../../interfaces'
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
  cardWidth: number
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, cardWidth }) => {
  return (
    <RecipeCardContainer width={cardWidth}>
      <RecipeCardLink to={`/recipe/${recipe.id}/${recipe.title}`}>
        <ImageContainer>
          <RecipeCardImage id={recipe.id.toString()} title={recipe.title} />
        </ImageContainer>
        <ContentContainer>
          {/* <Rating rating={recipe.ranking} size="xs" readonly /> */}
          <RecipeTitle>{recipe.title}</RecipeTitle>
        </ContentContainer>
      </RecipeCardLink>
    </RecipeCardContainer>
  )
}

export default RecipeCard
