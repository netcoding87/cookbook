import React from 'react'
import Table from 'react-bootstrap/Table'

import { RecipeData } from '../../../interfaces'

interface PreparationViewProps {
  recipe: RecipeData
}

const PreparationView: React.FC<PreparationViewProps> = ({ recipe }) => {
  return (
    <>
      <p>
        <h6>
          <u>Zubereitung:</u>
        </h6>
        {recipe.preparationTime && (
          <div>Vorbereitungszeit: {recipe.preparationTime}</div>
        )}
        <div>Back- / Kochzeit: {recipe.cookingTime}</div>
        {recipe.restTime && <div>Ruhezeit: {recipe.restTime}</div>}
      </p>
      <Table hover size="sm">
        <tbody>
          <tr>
            <td style={{ width: '50px' }}>1.</td>
            <td>Some text</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default PreparationView
