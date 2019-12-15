import React from 'react'
import Table from 'react-bootstrap/Table'

import { RecipeData } from '../../../interfaces'

interface IngredientsEditorProps {
  recipe: RecipeData
}

const IngredientsEditor: React.FC<IngredientsEditorProps> = ({ recipe }) => {
  return (
    <Table>
      <tbody></tbody>
      <tfoot>
        <tr>
          <td style={{ width: '100px' }}>
            <input type="text" placeholder="Menge" />
          </td>
          <td style={{ width: '110px' }}>
            <select>
              <option>Value</option>
            </select>
          </td>
          <td>
            <div>
              <input type="text" placeholder="Zutat" required />
              <span>
                <button type="button">+</button>
              </span>
            </div>
          </td>
        </tr>
      </tfoot>
    </Table>
  )
}

export default IngredientsEditor
