import { MockedResponse } from '@apollo/react-testing'
import { screen, waitFor } from '@testing-library/dom'
import React from 'react'

import { render } from '../../../tests/testUtils'
import { CategoriesDocument, MeasuresDocument } from '../../typings/generated.d'
import StaticDataProvider, { useStaticData } from './StaticDataProvider'

describe('<StaticDataProvider />', () => {
  it('should provide state that can be consumed with useStaticData', async () => {
    // Arrange
    const mockedMeasures = [
      {
        id: '1',
        name: 'Dose',
      },
      {
        id: '2',
        name: 'ml',
      },
    ]

    const mockedCategories = [
      {
        id: '1',
        name: 'Hauptspeise',
        parent: '-1',
      },
      {
        id: '2',
        name: 'Dessert',
        parent: '-1',
      },
    ]

    const mocks: MockedResponse[] = [
      {
        request: {
          query: MeasuresDocument,
        },
        result: {
          data: {
            measures: mockedMeasures,
          },
        },
      },
      {
        request: {
          query: CategoriesDocument,
        },
        result: {
          data: {
            categories: mockedCategories,
          },
        },
      },
    ]

    const Consumer = () => {
      const state = useStaticData()
      return <>{JSON.stringify(state)}</>
    }

    // Act
    const { container } = render(
      <StaticDataProvider>
        <Consumer />
      </StaticDataProvider>,
      { mocks }
    )

    // Assert
    expect(screen.getByText(/loading.../i)).toBeVisible()
    await waitFor(() => {
      expect(container.textContent).toContain(JSON.stringify(mockedMeasures))
      expect(container.textContent).toContain(JSON.stringify(mockedCategories))
    })
  })
})
