import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import useSWR from 'swr'

import { IngredientData, RecipeData } from '../../../interfaces'
import { useStaticData } from '../../StaticDataProvider'
import { HeadlineContainer } from './IngredientsView.styles'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

interface IngredientsViewProps {
  recipe: RecipeData
}

const IngredientsView: React.FC<IngredientsViewProps> = ({ recipe }) => {
  const { data } = useSWR<IngredientData[]>(
    `http://localhost:4000/recipes/${recipe.id}/ingredients`,
    async url => {
      await sleep(30)
      return fetch(url).then(response => response.json())
    },
    { suspense: true }
  )

  const { measures } = useStaticData()

  if (data === undefined || data.length === 0) {
    return null
  }

  return (
    <>
      <HeadlineContainer>
        <h5>
          <FontAwesomeIcon icon={['fas', 'balance-scale']} /> Zutaten
        </h5>
      </HeadlineContainer>
      {data.map(ingredient => {
        const measure = measures.find(item => item.id === ingredient.measureId)

        return (
          <div key={ingredient.id}>
            {ingredient.amount} {measure && measure.name}{' '}
            {ingredient.ingredient}
          </div>
        )
      })}
    </>
  )
}

export default IngredientsView
