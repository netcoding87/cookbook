import React from 'react'
import Table from 'react-bootstrap/Table'
import useSWR from 'swr'

import { IngredientData, RecipeData } from '../../../interfaces'
import { useMeasures } from '../../MeasuresProvider/MeasuresProvider'
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

  const measures = useMeasures()

  if (data === undefined || data.length === 0) {
    return null
  }

  return (
    <>
      <HeadlineContainer>
        <h5>
          <u>Zutaten:</u>{' '}
          <small className="text-muted">
            (für {recipe.servings} Portionen)
          </small>
        </h5>
      </HeadlineContainer>
      <Table hover size="sm">
        <tbody>
          {data.map(ingredient => {
            const measure = measures.find(item => item.id === ingredient.id)

            return (
              <tr key={ingredient.id}>
                <td style={{ width: '50px' }} align="right">
                  {ingredient.amount}
                </td>
                <td style={{ width: '50px' }}>{measure && measure.name}</td>
                <td>{ingredient.ingredient}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default IngredientsView
