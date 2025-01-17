import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { IngredientData, MeasureData } from '../../../typings/generated.d'
import { HeadlineContainer } from './IngredientsView.styles'

export type IngredientsViewData = Array<
  Pick<IngredientData, 'amount' | 'ingredient'> & {
    measure: Pick<MeasureData, 'name'>
  }
>

interface IngredientsViewProps {
  ingredients: IngredientsViewData
}

const IngredientsView: React.FC<IngredientsViewProps> = ({ ingredients }) => {
  return (
    <>
      <HeadlineContainer>
        <h5>
          <FontAwesomeIcon icon={['fas', 'balance-scale']} /> Zutaten
        </h5>
      </HeadlineContainer>
      {ingredients.map((ingredient, index) => {
        return (
          <div key={index}>
            {ingredient.amount}{' '}
            {ingredient.measure.name && ingredient.measure.name}{' '}
            {ingredient.ingredient}
          </div>
        )
      })}
    </>
  )
}

export default IngredientsView
