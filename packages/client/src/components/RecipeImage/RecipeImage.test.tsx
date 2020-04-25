import { MockedResponse } from '@apollo/react-testing'
import { waitFor } from '@testing-library/dom'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { render } from '../../../tests/testUtils'
import { ImageDocument } from '../../typings/generated.d'
import RecipeImage from './RecipeImage'

describe('<RecipeImage />', () => {
  it('should render loaded image', async () => {
    // Arrange
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
              image: 'Sample',
            },
          },
        },
      },
    ]

    // Act
    const { getByAltText } = render(
      <MemoryRouter>
        <RecipeImage id="1" title="TestImage" size="small" />
      </MemoryRouter>,
      { mocks }
    )

    // Assert
    await waitFor(() => {
      expect(getByAltText(/testimage/i)).toBeVisible()
    })
  })

  it('should render small no image in case no image exists', async () => {
    // Arrange
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
            image: null,
          },
        },
      },
    ]

    // Act
    const { getByTestId } = render(
      <MemoryRouter>
        <RecipeImage id="1" title="TestImage" size="small" />
      </MemoryRouter>,
      { mocks }
    )

    // Assert
    await waitFor(() => {
      expect(getByTestId('noImage')).toBeVisible()
    })
  })

  it('should render large no image in case no image exists', async () => {
    // Arrange
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
            image: null,
          },
        },
      },
    ]

    // Act
    const { getByTestId } = render(
      <MemoryRouter>
        <RecipeImage id="1" title="TestImage" />
      </MemoryRouter>,
      { mocks }
    )

    // Assert
    await waitFor(() => {
      expect(getByTestId('noImage')).toBeVisible()
    })
  })
})
