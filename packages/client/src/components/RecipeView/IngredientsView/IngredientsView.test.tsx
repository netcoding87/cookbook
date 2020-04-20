import React from 'react'

import { render } from '../../../../tests/testUtils'
import IngredientsView, { IngredientsViewData } from './IngredientsView'

describe('<IngredientsView />', () => {
  it('should render with no ingredients', async () => {
    // Arrange
    const ingredients: IngredientsViewData = []

    // Act
    const { getByText } = render(<IngredientsView ingredients={ingredients} />)

    // Assert
    expect(getByText(/zutaten/i)).toBeVisible()
  })

  it('should render with ingredients', async () => {
    // Arrange
    const ingredients: IngredientsViewData = [
      {
        ingredient: 'Zucker',
        measure: { name: 'g' },
        amount: '100',
      },
      {
        ingredient: 'Mehl',
        measure: { name: 'EL' },
        amount: '2',
      },
    ]

    // Act
    const { getByText } = render(<IngredientsView ingredients={ingredients} />)

    // Assert
    expect(getByText(/zucker/i)).toBeVisible()
    expect(getByText(/100/i)).toBeVisible()
    expect(getByText(/g/i)).toBeVisible()

    expect(getByText(/mehl/i)).toBeVisible()
    expect(getByText(/2/i)).toBeVisible()
    expect(getByText(/el/i)).toBeVisible()
  })
})
