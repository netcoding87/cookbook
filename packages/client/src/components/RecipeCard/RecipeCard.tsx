import React from 'react'

import { RecipeData } from '../../typings/generated.d'
import RecipeImage from '../RecipeImage'
import {
  ContentContainer,
  ImageContainer,
  RecipeCardContainer,
  RecipeCardLink,
  RecipeTitle,
} from './RecipeCard.styles'

type RecipeCardRecipeData = Pick<RecipeData, 'id' | 'title'>

interface RecipeCardProps {
  recipe: RecipeCardRecipeData
  cardWidth: number
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, cardWidth }) => {
  return (
    <RecipeCardContainer width={cardWidth}>
      <RecipeCardLink to={`/recipe/${recipe.id}/${recipe.title}`}>
        <ImageContainer>
          <RecipeImage id={recipe.id} title={recipe.title} size="small" />
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
