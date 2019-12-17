import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import Select from 'react-select'

import { IngredientData } from '../../../interfaces'
import { useStaticData } from '../../StaticDataProvider'
import { Input } from '../RecipeEdit.styles'

interface IngredientsEditorProps {
  ingredients: IngredientData[]
  onChange?: (ingredients: IngredientData[]) => void
}

const IngredientsEditor: React.FC<IngredientsEditorProps> = ({
  ingredients,
  onChange,
}) => {
  const { measures } = useStaticData()

  const measureOptions = measures.map(measure => ({
    value: measure.id,
    label: measure.name,
  }))

  return (
    <Table hover size="sm">
      <tbody>
        {ingredients.map(ingredient => {
          const measure = measures.find(item => item.id === ingredient.id)

          return (
            <tr key={ingredient.id}>
              <td>
                <Input
                  type="text"
                  placeholder="Menge"
                  defaultValue={ingredient.amount}
                />
              </td>
              <td>
                <Select
                  placeholder="Einheit"
                  defaultValue={
                    measure && {
                      value: measure.id,
                      label: measure.name,
                    }
                  }
                  options={measureOptions}
                />
              </td>
              <td>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Zutat"
                    defaultValue={ingredient.ingredient}
                    required
                  />
                  <InputGroup.Append>
                    <Button variant="secondary">
                      <FontAwesomeIcon icon="trash" />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </td>
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          <td style={{ width: '100px' }}>
            <Input type="text" placeholder="Menge" />
          </td>
          <td style={{ width: '110px' }}>
            <Select placeholder="Einheit" options={measureOptions} />
          </td>
          <td>
            <InputGroup>
              <Input type="text" placeholder="Zutat" required />
              <InputGroup.Append>
                <Button variant="secondary">
                  <FontAwesomeIcon icon="plus" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </td>
        </tr>
      </tfoot>
    </Table>
  )
}

export default IngredientsEditor
