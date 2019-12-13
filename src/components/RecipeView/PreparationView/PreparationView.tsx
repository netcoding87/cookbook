import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import { RecipeData } from '../../../interfaces'
import { HeadlineContainer } from './PreparationView.styles'

interface PreparationViewProps {
  recipe: RecipeData
}

const PreparationView: React.FC<PreparationViewProps> = ({ recipe }) => {
  return (
    <>
      <HeadlineContainer>
        <h5>
          <u>Zubereitung:</u>
        </h5>
        {recipe.preparationTime && (
          <div>Vorbereitungszeit: {recipe.preparationTime}</div>
        )}
        <div>Back- / Kochzeit: {recipe.cookingTime}</div>
        {recipe.restTime && <div>Ruhezeit: {recipe.restTime}</div>}
      </HeadlineContainer>
      {recipe.preparations && <div>{ReactHtmlParser(recipe.preparations)}</div>}
    </>
  )
}

export default PreparationView
