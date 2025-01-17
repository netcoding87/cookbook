import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GlobalStyle from '../GlobalStyle'
import RecipeEdit from '../RecipeEdit'
import RecipeNew from '../RecipeNew'
import RecipeView from '../RecipeView'
import StaticDataProvider from '../StaticDataProvider'

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.error(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: 'http://localhost:4321/graphql',
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
})

const App: React.FC = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <StaticDataProvider>
          <BrowserRouter>
            <GlobalStyle />
            <Switch>
              <Route path="/" exact>
                <Dashboard />
              </Route>
              <Route path="/new" exact>
                <RecipeNew />
              </Route>
              <Route path="/recipe/:id/:title" exact>
                <RecipeView />
              </Route>
              <Route path="/recipe/:id/:title/edit" exact>
                <RecipeEdit />
              </Route>
              <Route path="/search/:searchTerm" exact>
                <Dashboard />
              </Route>
              <Route>
                <RecipeView />
              </Route>
            </Switch>
            {/* This is for use in electron */}
            {window.location.pathname.includes('index.html') && (
              <Redirect to="/" />
            )}
          </BrowserRouter>
        </StaticDataProvider>
      </ApolloProvider>
    </>
  )
}

export default App
