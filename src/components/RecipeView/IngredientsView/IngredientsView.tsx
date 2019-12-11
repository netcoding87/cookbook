import React from 'react'
import Table from 'react-bootstrap/Table'
import useSWR from 'swr'

import { RecipeData } from '../../../interfaces'
import { IngredientData } from '../../../interfaces/IngredientData'

interface IngredientsViewProps {
  recipe: RecipeData
}

const IngredientsView: React.FC<IngredientsViewProps> = ({ recipe }) => {
  const { data } = useSWR<IngredientData[]>(
    `http://localhost:4000/recipes/${recipe.id}/ingredients`,
    url => fetch(url).then(response => response.json()),
    { suspense: true }
  )

  if (data === undefined || data.length === 0) {
    return null
  }

  return (
    <>
      <p>
        <h6>
          <u>Zutaten:</u>
        </h6>
        (für {recipe.servings} Portionen)
      </p>
      <Table hover size="sm">
        <tbody>
          <tr>
            <td>25</td>
            <td>ml</td>
            <td>Milch</td>
          </tr>
          <tr>
            <td>25</td>
            <td>ml</td>
            <td>Milch</td>
          </tr>
          <tr>
            <td>25</td>
            <td>ml</td>
            <td>Milch</td>
          </tr>
          <tr>
            <td>25</td>
            <td>ml</td>
            <td>Milch</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default IngredientsView
