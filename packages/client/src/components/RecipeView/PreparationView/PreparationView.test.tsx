import { screen } from '@testing-library/react'
import React from 'react'

import { render } from '../../../../tests/testUtils'
import PreparationView from './PreparationView'

describe('<PreparationView />', () => {
  it('should render with no preparations', async () => {
    // Arrange
    const preparations = ''

    // Act
    render(<PreparationView preparations={preparations} />)

    // Assert
    expect(screen.getByRole('heading')).toHaveTextContent(/zubereitung/i)
    expect(screen.getByTestId('preparations')).toHaveTextContent(
      /keine zubereitung vorhanden/i
    )
  })

  it('should render with ingredients', async () => {
    // Arrange
    const preparations = 'Do <b>not</b> forget to test this!'

    // Act
    render(<PreparationView preparations={preparations} />)

    // Assert
    expect(screen.getByTestId('preparations')).toHaveTextContent(
      'Do not forget to test this!'
    )
  })
})
