import { fireEvent, waitFor } from '@testing-library/dom'
import { screen } from '@testing-library/react'
import React from 'react'
import { Route, Switch, useParams } from 'react-router-dom'

import { render } from '../../../tests/testUtils'
import Header from './Header'

const SearchPage = () => {
  const { searchTerm } = useParams()
  return <div>Searched for: {searchTerm}</div>
}

describe('<Header />', () => {
  it('should open search page on enter key in search field', async () => {
    // Arrange
    const { container } = render(
      <Switch>
        <Route exact path="/">
          <Header />
        </Route>
        <Route exact path="/search/:searchTerm">
          <SearchPage />
        </Route>
      </Switch>
    )

    // Act (enter some search value)
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'test' },
    })
    fireEvent.keyDown(screen.getByPlaceholderText(/search/i), { keyCode: 13 })

    // Assert
    await waitFor(() => {
      expect(container.textContent).toContain('Searched for: test')
    })
  })

  it('should not open search page on enter key in search field when input is empty', async () => {
    // Arrange
    const { container } = render(
      <Switch>
        <Route exact path="/">
          <Header />
        </Route>
        <Route exact path="/search/:searchTerm">
          <SearchPage />
        </Route>
      </Switch>
    )

    // Act (enter empty search value)
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: '' },
    })
    fireEvent.keyDown(screen.getByPlaceholderText(/search/i), { keyCode: 13 })

    // Assert
    await waitFor(() => {
      expect(container.textContent).not.toContain('Searched for:')
    })
  })

  it('should do nothing when keyDown is not enter key', async () => {
    // Arrange
    const { container } = render(
      <Switch>
        <Route exact path="/">
          <Header />
        </Route>
        <Route exact path="/search/:searchTerm">
          <SearchPage />
        </Route>
      </Switch>
    )

    // Act (enter empty search value)
    fireEvent.keyDown(screen.getByPlaceholderText(/search/i), { keyCode: 86 })

    // Assert
    await waitFor(() => {
      expect(container.textContent).not.toContain('Searched for:')
    })
  })

  it('should have search box prefilled with value from useParams', async () => {
    // Act
    render(
      <Route exact path="/search/:searchTerm">
        <Header />
      </Route>,
      { url: '/search/prefilled' }
    )

    // Assert
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('prefilled')
  })
})
