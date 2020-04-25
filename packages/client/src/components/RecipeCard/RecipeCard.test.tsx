import { MockedResponse } from '@apollo/react-testing'
import { waitFor } from '@testing-library/dom'
import React from 'react'

import { render } from '../../../tests/testUtils'
import { ImageDocument } from '../../typings/generated.d'
import RecipeCard from './RecipeCard'

describe('<RecipeCard />', () => {
  it('should render recipe with image', async () => {
    // Arrange
    const recipe = {
      id: '1',
      title: 'Recipetest',
    }
    const mocks: MockedResponse[] = [
      {
        request: {
          query: ImageDocument,
          variables: {
            recipe: '1',
          },
        },
        result: {
          data: {
            image: {
              id: 'abc',
              image: 'TestImage',
            },
          },
        },
      },
    ]

    // Act
    const { getByText, getByAltText } = render(
      <RecipeCard recipe={recipe} cardWidth={200} />,
      { mocks }
    )

    // Assert
    expect(getByText(/recipetest/i)).toBeVisible()
    await waitFor(() => {
      expect(getByAltText(/recipetest/i)).toBeVisible()
    })
  })
})
