import { screen } from '@testing-library/react'
import React from 'react'

import { render } from '../../../../tests/testUtils'
import IngredientsView, { IngredientsViewData } from './IngredientsView'

describe('<IngredientsView />', () => {
  it('should render with no ingredients', async () => {
    // Arrange
    const ingredients: IngredientsViewData = []

    // Act
    render(<IngredientsView ingredients={ingredients} />)

    // Assert
    expect(screen.getByRole('heading')).toHaveTextContent(/zutaten/i)
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
    render(<IngredientsView ingredients={ingredients} />)

    // Assert
    expect(screen.getByText(/zucker/i)).toBeVisible()
    expect(screen.getByText(/100/i)).toBeVisible()
    expect(screen.getByText(/g/i)).toBeVisible()

    expect(screen.getByText(/mehl/i)).toBeVisible()
    expect(screen.getByText(/2/i)).toBeVisible()
    expect(screen.getByText(/el/i)).toBeVisible()
  })
})
