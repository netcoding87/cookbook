import { screen } from '@testing-library/dom'
import React from 'react'

import { render } from '../../../tests/testUtils'
import Rating from './Rating'

describe('<Rating />', () => {
  it('should fire onChange event when click on star', async () => {
    // Arrange
    const handleChange = jest.fn()
    render(<Rating rating={3} onChange={handleChange} />)

    // Act
    screen.getAllByTestId('emptyStar')[0].parentElement?.click()

    // Assert
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(1)
  })

  it('should render with small icon size and fire onChange event when click on star', async () => {
    // Arrange
    const handleChange = jest.fn()
    render(<Rating rating={3} onChange={handleChange} size="xs" />)

    // Act
    screen.getAllByTestId('emptyStar')[0].parentElement?.click()

    // Assert
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(1)
  })

  it('should fire no onChange event when click on star and rating is readonly', async () => {
    // Arrange
    const handleChange = jest.fn()
    render(<Rating rating={3} onChange={handleChange} readonly />)

    // Act
    screen.getAllByTestId('emptyStar')[0].parentElement?.click()

    // Assert
    expect(handleChange).not.toHaveBeenCalled()
  })
})
