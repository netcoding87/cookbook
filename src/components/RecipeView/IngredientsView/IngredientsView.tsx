import React from 'react'
import Table from 'react-bootstrap/Table'

import { RecipeData } from '../../../interfaces'

interface IngredientsViewProps {
  recipe: RecipeData
}

const IngredientsView: React.FC<IngredientsViewProps> = ({ recipe }) => {
  return (
    <>
      <p>
        <strong>
          <u>Zutaten:</u>
        </strong>
        <br /> (für {recipe.servings} Portionen)
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
