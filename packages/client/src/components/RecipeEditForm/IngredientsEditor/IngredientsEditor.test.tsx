import { fireEvent, screen, within } from '@testing-library/react'
import React from 'react'
import selectEvent from 'react-select-event'
import { mocked } from 'ts-jest/utils'

import { render } from '../../../../tests/testUtils'
import { useStaticData } from '../../StaticDataProvider'
import { RecipeEditFormIngredientData } from '../RecipeEditForm'
import IngredientsEditor from './IngredientsEditor'

jest.mock('../../StaticDataProvider')

describe('<IngredientsEditor />', () => {
  beforeEach(() => {
    mocked(useStaticData).mockReturnValue({
      categories: [],
      measures: [],
    })
  })

  it('should render with empty input', async () => {
    // Arrange
    const ingredients: RecipeEditFormIngredientData[] = []
    const handleAdd = jest.fn()
    const handleDelete = jest.fn()
    const handleChange = jest.fn()

    // Act
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

    // Act
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

  it('should call the onAdd handler on adding a new ingredient', async () => {
    // Arrange
    mocked(useStaticData).mockReturnValue({
      categories: [],
      measures: [
        {
          id: '1',
          name: 'Tasse',
        },
        {
          id: '2',
          name: 'Bd',
        },
        {
          id: '3',
          name: 'Stk',
        },
      ],
    })

    const ingredients: RecipeEditFormIngredientData[] = []

    const handleAdd = jest.fn()
    const handleDelete = jest.fn()
    const handleChange = jest.fn()

    render(
      <IngredientsEditor
        ingredients={ingredients}
        onChange={handleChange}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    )

    // Act (enter by button)
    fireEvent.change(screen.getByPlaceholderText(/menge/i), {
      target: { value: '100' },
    })
    fireEvent.change(screen.getByPlaceholderText(/zutat/i), {
      target: { value: 'Zucker' },
    })
    await selectEvent.select(
      within(screen.getByTestId('addIngredientMeasureSelect')).getByText(
        /einheit/i
      ),
      'Stk'
    )
    screen.getByTestId('addIngredientButton').click()

    // Assert
    expect(handleAdd).toBeCalledTimes(1)
    expect(handleAdd).toBeCalledWith('100', '3', 'Zucker')

    expect(screen.getByPlaceholderText(/menge/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/zutat/i)).toHaveValue('')

    // Arrange
    handleAdd.mockClear()

    // Act (enter by 'enter' key)
    fireEvent.change(screen.getByPlaceholderText(/menge/i), {
      target: { value: '2' },
    })
    fireEvent.change(screen.getByPlaceholderText(/zutat/i), {
      target: { value: 'Eier' },
    })
    fireEvent.keyDown(screen.getByPlaceholderText(/zutat/i), { keyCode: 13 })

    // Assert
    expect(handleAdd).toBeCalledTimes(1)
    expect(handleAdd).toBeCalledWith('2', '', 'Eier')

    expect(screen.getByPlaceholderText(/menge/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/zutat/i)).toHaveValue('')

    // Arrange
    handleAdd.mockClear()

    // Act (key down different than 'enter' key)
    fireEvent.change(screen.getByPlaceholderText(/menge/i), {
      target: { value: '5' },
    })
    fireEvent.change(screen.getByPlaceholderText(/zutat/i), {
      target: { value: 'Butter' },
    })
    fireEvent.keyDown(screen.getByPlaceholderText(/zutat/i), { keyCode: 86 })

    // Assert
    expect(handleAdd).not.toBeCalled()

    expect(screen.getByPlaceholderText(/menge/i)).toHaveValue('5')
    expect(screen.getByPlaceholderText(/zutat/i)).toHaveValue('Butter')
  })

  it('should call the onDelete handler on clicking delete button of one ingredient', async () => {
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

    const { container } = render(
      <IngredientsEditor
        ingredients={ingredients}
        onChange={handleChange}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    )

    const table = container.getElementsByTagName('tbody')[0]
    const row = within(table).getByDisplayValue(/mehl/i).closest('tr')
    expect(row).not.toBeNull()

    // Act
    within(row!).getByRole('button').click()

    // Assert
    expect(handleDelete).toBeCalledTimes(1)
    expect(handleDelete).toBeCalledWith(ingredients[1])
  })

  it('should call the onChange handler when chaning one ingredient', async () => {
    // Arrange
    mocked(useStaticData).mockReturnValue({
      categories: [],
      measures: [
        {
          id: '1',
          name: 'Tasse',
        },
        {
          id: '2',
          name: 'Bd',
        },
        {
          id: '3',
          name: 'Stk',
        },
      ],
    })

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

    const { container } = render(
      <IngredientsEditor
        ingredients={ingredients}
        onChange={handleChange}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    )

    const table = container.getElementsByTagName('tbody')[0]
    const row = within(table).getByDisplayValue(/mehl/i).closest('tr')
    expect(row).not.toBeNull()

    // Act (change amount)
    const amountInput = within(row!).getByPlaceholderText(/menge/i)
    fireEvent.change(amountInput, {
      target: { value: '100' },
    })
    fireEvent.blur(amountInput)

    // Assert
    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toBeCalledWith(ingredients[1], 'amount', '100')

    // Arrange
    handleChange.mockClear()

    // Act (change measure)
    await selectEvent.select(within(row!).getByText(/bd/i), 'Stk')

    // Assert
    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toBeCalledWith(ingredients[1], 'measureId', '3')

    // Arrange
    handleChange.mockClear()

    // Act (change ingredient)
    const ingredientInput = within(row!).getByPlaceholderText(/zutat/i)
    fireEvent.change(ingredientInput, {
      target: { value: 'Mais' },
    })
    fireEvent.blur(ingredientInput)

    // Assert
    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toBeCalledWith(ingredients[1], 'ingredient', 'Mais')
  })
})
