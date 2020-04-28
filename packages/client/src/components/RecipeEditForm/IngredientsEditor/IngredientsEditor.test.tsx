import { screen } from '@testing-library/dom'
import React from 'react'

import { render } from '../../../../tests/testUtils'
import { RecipeEditFormIngredientData } from '../RecipeEditForm'
import IngredientsEditor from './IngredientsEditor'

describe('<IngredientsEditor />', () => {
  it('should render with empty input', async () => {
    // Arrange
    const ingredients: RecipeEditFormIngredientData[] = []
    const handleAdd = jest.fn()
    const handleDelete = jest.fn()
    const handleChange = jest.fn()

    // Act (enter some search value)
    render(
      <IngredientsEditor
        ingredients={ingredients}
        onChange={handleChange}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    )

    // Assert
    expect(screen.getByPlaceholderText(/menge/i)).toBeVisible()
    expect(screen.getByText(/einheit/i)).toBeVisible()
    expect(screen.getByPlaceholderText(/zutat/i)).toBeVisible()
  })

  it('should render existing ingredients', async () => {
    // Arrange
    const ingredients: RecipeEditFormIngredientData[] = [
      {
        ingredient: 'Zucker',
        measure: {
          id: '1',
        },
      },
      { ingredient: 'Mehl', measure: { id: '2' }, amount: '200' },
    ]
    const handleAdd = jest.fn()
    const handleDelete = jest.fn()
    const handleChange = jest.fn()

    // Act (enter some search value)
    render(
      <IngredientsEditor
        ingredients={ingredients}
        onChange={handleChange}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    )

    // Assert
    expect(screen.getByDisplayValue(/200/i)).toBeVisible()
    expect(screen.getByDisplayValue(/zucker/i)).toBeVisible()
    expect(screen.getByDisplayValue(/mehl/i)).toBeVisible()
    expect(screen.getByTestId('addIngredientRow')).toBeVisible()
  })
})
