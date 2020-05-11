import { MockedResponse } from '@apollo/react-testing'
import { screen, waitFor } from '@testing-library/dom'
import React from 'react'
import { mocked } from 'ts-jest/utils'

import { render } from '../../../tests/testUtils'
import { RecipesDocument } from '../../typings/generated.d'
import { useStaticData } from '../StaticDataProvider'
import Dashboard from './Dashboard'

jest.mock('../StaticDataProvider')

describe('<Dashboard />', () => {
  beforeEach(() => {
    mocked(useStaticData).mockReturnValue({
      categories: [],
      measures: [],
    })
  })

  it('should display recipes', async () => {
    // Arrange
    mocked(useStaticData).mockReturnValue({
      categories: [
        {
          id: '1',
          name: 'Salate',
          parent: '-1',
        },
        {
          id: '2',
          name: 'Hauptspeise',
          parent: '-1',
        },
      ],
      measures: [],
    })

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipesDocument,
          variables: {
            filter: undefined,
          },
        },
        result: {
          data: {
            recipes: [
              {
                id: '1',
                title: 'Nudelsalat',
                category: {
                  id: '1',
                  name: 'Salate',
                },
              },
              {
                id: '2',
                title: 'Pizza',
                category: {
                  id: '2',
                  name: 'Hauptspeise',
                },
              },
              {
                id: '3',
                title: 'Spaghetti',
                category: {
                  id: '2',
                  name: 'Hauptspeise',
                },
              },
            ],
          },
        },
      },
    ]

    // Act
    render(<Dashboard />, { mocks: mocks })

    // Assert
    expect(screen.getByText(/loading/i)).toBeVisible()

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Nudelsalat')).toBeVisible()
      expect(screen.getByText('Pizza')).toBeVisible()

      expect(screen.getByText('Hauptspeise')).toBeVisible()
      expect(screen.getByText('Salate')).toBeVisible()
    })
  })

  it('should render with empty data', async () => {
    // Arrange
    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipesDocument,
          variables: {
            filter: undefined,
          },
        },
        result: {
          data: {
            recipes: [],
          },
        },
      },
    ]

    // Act
    render(<Dashboard />, { mocks: mocks })

    // Assert
    expect(screen.getByText(/loading/i)).toBeVisible()

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Rezepte')).toBeVisible()
    })
  })
})
