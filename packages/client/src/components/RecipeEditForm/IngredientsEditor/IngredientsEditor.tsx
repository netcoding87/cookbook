/* eslint-disable react/no-multi-comp */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import Select, { ValueType } from 'react-select'

import { useStaticData } from '../../StaticDataProvider'
import { RecipeEditFormIngredientData } from '../RecipeEditForm'
import { Input } from '../RecipeEditForm.styles'

type addIngredient = (
  amount: string,
  measureId: string,
  ingredient: string
) => void

type deleteIngredient = (ingredient: RecipeEditFormIngredientData) => void
type updateIngredient = (
  ingredient: RecipeEditFormIngredientData,
  field: string,
  value: unknown
) => void

interface EditableCellProps {
  value: string | null | undefined
  placeholder: string
  field: string
  ingredient: RecipeEditFormIngredientData
  updateIngredient: updateIngredient
  required?: boolean
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  placeholder,
  field,
  ingredient,
  updateIngredient,
  required = false,
}) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateIngredient(ingredient, field, value)
  }

  // If the initialValue is changed externall, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
    />
  )
}

interface IngredientsEditorProps {
  ingredients: RecipeEditFormIngredientData[]
  onAdd: addIngredient
  onDelete: deleteIngredient
  onChange: updateIngredient
}

const IngredientsEditor: React.FC<IngredientsEditorProps> = ({
  ingredients,
  onAdd,
  onDelete,
  onChange,
}) => {
  const [amount, setAmount] = useState('')
  const [measure, setMeasure] = useState('')
  const [ingredient, setIngredient] = useState('')

  const { measures } = useStaticData()

  const measureOptions = measures
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((measure) => ({
      value: measure.id,
      label: measure.name,
    }))

  const handleIngredientAdd = () => {
    onAdd(amount, measure, ingredient)
    setAmount('')
    setMeasure('')
    setIngredient('')
  }

  const handleIngredientDelete = (ingredient: RecipeEditFormIngredientData) => {
    onDelete(ingredient)
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredient(event.target.value)
  }

  const handleIngredientKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key.toLowerCase() === 'enter') {
      event.stopPropagation()
      event.preventDefault()
      handleIngredientAdd()
    }
  }

  const handleMeasureChange = (value: ValueType<any>) => {
    if (value) {
      setMeasure(value.value)
    }
  }

  return (
    <Table hover size="sm">
      <tbody>
        {ingredients.map((ingredient, index) => {
          const measure = measures.find(
            (item) => item.id === ingredient.measure.id
          )

          return (
            <tr key={index}>
              <td>
                <EditableCell
                  field="amount"
                  placeholder="Menge"
                  ingredient={ingredient}
                  updateIngredient={onChange}
                  value={ingredient.amount}
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
                  onChange={(value: ValueType<any>) => {
                    if (value) {
                      onChange(ingredient, 'measureId', value.value)
                    }
                  }}
                />
              </td>
              <td>
                <InputGroup>
                  <EditableCell
                    field="ingredient"
                    placeholder="Zutat"
                    ingredient={ingredient}
                    updateIngredient={onChange}
                    value={ingredient.ingredient}
                    required
                  />
                  <InputGroup.Append>
                    <Button
                      variant="secondary"
                      onClick={() => handleIngredientDelete(ingredient)}
                    >
                      <FontAwesomeIcon icon="trash" />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </td>
            </tr>
          )
        })}
      </tbody>
      <tfoot data-testid="addIngredientRow">
        <tr>
          <td style={{ width: '100px' }}>
            <Input
              type="text"
              placeholder="Menge"
              value={amount}
              onChange={handleAmountChange}
            />
          </td>
          <td style={{ width: '110px' }}>
            <Select
              placeholder="Einheit"
              options={measureOptions}
              onChange={handleMeasureChange}
            />
          </td>
          <td>
            <InputGroup>
              <Input
                type="text"
                placeholder="Zutat"
                value={ingredient}
                onChange={handleIngredientChange}
                onKeyPress={handleIngredientKeyPress}
                required
              />
              <InputGroup.Append>
                <Button variant="secondary" onClick={handleIngredientAdd}>
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
