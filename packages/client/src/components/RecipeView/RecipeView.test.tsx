import { MockedResponse } from '@apollo/react-testing'
import { waitFor } from '@testing-library/dom'
import { screen } from '@testing-library/react'
import { GraphQLError } from 'graphql'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { render } from '../../../tests/testUtils'
import {
  DeleteRecipeDocument,
  RecipeViewDocument,
} from '../../typings/generated.d'
import RecipeView from './RecipeView'

describe('<RecipeView />', () => {
  it('should render recipe', async () => {
    // Arrange
    const id = 'someRecipeID'
    const title = 'My favourite bread'

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipeViewDocument,
          variables: {
            id: id,
          },
        },
        result: {
          data: {
            recipe: {
              id: id,
              title: 'My favourite bread',
              subtitle: 'ready in 20 min',
              tags: '',
              ranking: 5,
              servings: 4,
              difficulty: 0,
              preparationTime: '5min',
              cookingTime: '15min',
              restTime: '',
              preparations:
                'Get ingredients, mash all together and put in oven',
              source: '',
              ingredients: [],
            },
          },
        },
      },
    ]

    // Act
    render(
      <Route path="/recipe/:id/:title">
        <RecipeView />
      </Route>,
      { mocks: mocks, url: `/recipe/${id}/${title}` }
    )

    expect(screen.getByText(/loading/i)).toBeVisible()

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/ready in 20 min/i)).toBeVisible()
      expect(screen.getByText(/portionen: 4/i)).toBeVisible()
      expect(screen.getByText('Vorbereitungszeit: 5min')).toBeVisible()
      expect(screen.getByText('Back- / Kochzeit: 15min')).toBeVisible()
      expect(
        screen.getByText('Get ingredients, mash all together and put in oven')
      ).toBeVisible()
      expect(screen.getByText(/schwierigkeit: leicht/i)).toBeVisible()
    })
  })

  it('should render invalid message in case recipe is not found', async () => {
    // Arrange
    const id = 'someRecipeID'
    const title = 'My favourite bread'

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipeViewDocument,
          variables: {
            id: id,
          },
        },
        result: {
          data: {
            recipe: null,
          },
        },
      },
    ]

    // Act
    render(
      <Route path="/recipe/:id/:title">
        <RecipeView />
      </Route>,
      { mocks: mocks, url: `/recipe/${id}/${title}` }
    )

    expect(screen.getByText(/loading/i)).toBeVisible()

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/invalid!/i)).toBeVisible()
    })
  })

  it('should render invalid message in case recipe title does not match title in url', async () => {
    // Arrange
    const id = 'someRecipeID'
    const title = 'My favourite bread'

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipeViewDocument,
          variables: {
            id: id,
          },
        },
        result: {
          data: {
            recipe: {
              id: id,
              title: 'Different title',
              subtitle: '',
              tags: '',
              ranking: 0,
              servings: 0,
              difficulty: 0,
              preparationTime: '',
              cookingTime: '',
              restTime: '',
              preparations: '',
              source: '',
              ingredients: [],
            },
          },
        },
      },
    ]

    // Act
    render(
      <Route path="/recipe/:id/:title">
        <RecipeView />
      </Route>,
      { mocks: mocks, url: `/recipe/${id}/${title}` }
    )

    expect(screen.getByText(/loading/i)).toBeVisible()

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/invalid!/i)).toBeVisible()
    })
  })

  it('should render error message in case of query error', async () => {
    // Arrange
    const id = 'someRecipeID'
    const title = 'My favourite bread'

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipeViewDocument,
          variables: {
            id: id,
          },
        },
        result: {
          errors: [new GraphQLError('query not defined')],
        },
      },
    ]

    // Act
    render(
      <Route path="/recipe/:id/:title">
        <RecipeView />
      </Route>,
      { mocks: mocks, url: `/recipe/${id}/${title}` }
    )

    expect(screen.getByText(/loading/i)).toBeVisible()

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/an error ocurred/i)).toBeVisible()
    })
  })

  it('should open modal dialog before deleting and navigate to root page on success', async () => {
    // Arrange
    const id = 'someRecipeID'
    const title = 'My favourite bread'

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipeViewDocument,
          variables: {
            id: id,
          },
        },
        result: {
          data: {
            recipe: {
              id: id,
              title: title,
              subtitle: '',
              tags: '',
              ranking: 5,
              servings: 4,
              difficulty: 0,
              preparationTime: '5min',
              cookingTime: '15min',
              restTime: '',
              preparations: 'Some preparations',
              source: '',
              ingredients: [],
            },
          },
        },
      },
      {
        request: {
          query: DeleteRecipeDocument,
          variables: {
            id: id,
          },
        },
        result: {
          data: {
            removeRecipe: {
              data: true,
            },
          },
        },
      },
    ]

    render(
      <Switch>
        <Route path="/recipe/:id/:title">
          <RecipeView />
        </Route>
        <Route path="/">
          <div>Home</div>
        </Route>
      </Switch>,
      { mocks: mocks, url: `/recipe/${id}/${title}` }
    )
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    // Act (click on delete button)
    screen.getByText(/löschen/i).click()

    // Assert
    await waitFor(() => {
      expect(
        screen.getByText(/möchten sie dieses rezept wirklich löschen\?/i)
      ).toBeVisible()
    })

    // Act (click on cancel button)
    screen.getByText(/nein/i).click()

    // Assert
    await waitFor(() => {
      expect(
        screen.queryByText(/möchten sie dieses rezept wirklich löschen\?/i)
      ).not.toBeInTheDocument()
    })

    // Act (click on delete button)
    screen.getByText(/löschen/i).click()

    // Assert
    await waitFor(() => {
      expect(
        screen.getByText(/möchten sie dieses rezept wirklich löschen\?/i)
      ).toBeVisible()
    })

    // Act (click on confirmation button)
    screen.getByText(/ja/i).click()

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeVisible()
    })
  })

  it('should open print dialog', async () => {
    // Arrange
    const printSpy = jest.spyOn(window, 'print')
    printSpy.mockImplementation(() => {})

    const id = 'someRecipeID'
    const title = 'My favourite bread'

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipeViewDocument,
          variables: {
            id: id,
          },
        },
        result: {
          data: {
            recipe: {
              id: id,
              title: 'My favourite bread',
              subtitle: '',
              tags: '',
              ranking: 5,
              servings: 4,
              difficulty: 0,
              preparationTime: '5min',
              cookingTime: '15min',
              restTime: '',
              preparations: 'Some preparations',
              source: '',
              ingredients: [],
            },
          },
        },
      },
    ]
    render(
      <Route path="/recipe/:id/:title">
        <RecipeView />
      </Route>,
      { mocks: mocks, url: `/recipe/${id}/${title}` }
    )
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    // Act (click on print button)
    screen.getByText(/drucken/i).click()

    // Assert
    await waitFor(() => {
      expect(printSpy).toHaveBeenCalledTimes(1)
    })
  })

  it('should render recipe widt medium difficuly ', async () => {
    // Arrange
    const id = 'someRecipeID'
    const title = 'My favourite bread'

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipeViewDocument,
          variables: {
            id: id,
          },
        },
        result: {
          data: {
            recipe: {
              id: id,
              title: 'My favourite bread',
              subtitle: 'ready in 20 min',
              tags: '',
              ranking: 5,
              servings: 4,
              difficulty: 1,
              preparationTime: '5min',
              cookingTime: '15min',
              restTime: '',
              preparations:
                'Get ingredients, mash all together and put in oven',
              source: '',
              ingredients: [],
            },
          },
        },
      },
    ]

    // Act
    render(
      <Route path="/recipe/:id/:title">
        <RecipeView />
      </Route>,
      { mocks: mocks, url: `/recipe/${id}/${title}` }
    )

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/schwierigkeit: mittel/i)).toBeVisible()
    })
  })

  it('should render recipe widt hard difficuly ', async () => {
    // Arrange
    const id = 'someRecipeID'
    const title = 'My favourite bread'

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipeViewDocument,
          variables: {
            id: id,
          },
        },
        result: {
          data: {
            recipe: {
              id: id,
              title: 'My favourite bread',
              subtitle: 'ready in 20 min',
              tags: '',
              ranking: 5,
              servings: 4,
              difficulty: 2,
              preparationTime: '5min',
              cookingTime: '15min',
              restTime: '',
              preparations:
                'Get ingredients, mash all together and put in oven',
              source: '',
              ingredients: [],
            },
          },
        },
      },
    ]

    // Act
    render(
      <Route path="/recipe/:id/:title">
        <RecipeView />
      </Route>,
      { mocks: mocks, url: `/recipe/${id}/${title}` }
    )

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/schwierigkeit: schwer/i)).toBeVisible()
    })
  })

  it('should render resttime if set', async () => {
    // Arrange
    const id = 'someRecipeID'
    const title = 'My favourite bread'

    const mocks: MockedResponse[] = [
      {
        request: {
          query: RecipeViewDocument,
          variables: {
            id: id,
          },
        },
        result: {
          data: {
            recipe: {
              id: id,
              title: 'My favourite bread',
              subtitle: 'ready in 20 min',
              tags: '',
              ranking: 5,
              servings: 4,
              difficulty: 1,
              preparationTime: '5min',
              cookingTime: '15min',
              restTime: '10min',
              preparations:
                'Get ingredients, mash all together and put in oven',
              source: '',
              ingredients: [],
            },
          },
        },
      },
    ]

    // Act
    render(
      <Route path="/recipe/:id/:title">
        <RecipeView />
      </Route>,
      { mocks: mocks, url: `/recipe/${id}/${title}` }
    )

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Ruhezeit: 10min')).toBeVisible()
    })
  })
})
