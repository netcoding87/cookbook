import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GlobalStyle from '../GlobalStyle'
import RecipeEdit from '../RecipeEdit'
import RecipeNew from '../RecipeNew'
import RecipeView from '../RecipeView'
import StaticDataProvider from '../StaticDataProvider'

const client = new ApolloClient({
  uri: 'http://localhost:4321/graphql',
})

const App: React.FC = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <StaticDataProvider>
          <BrowserRouter>
            <GlobalStyle />
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/new">
                <RecipeNew />
              </Route>
              <Route path="/recipe/:id/:title" exact>
                <RecipeView />
              </Route>
              <Route path="/recipe/:id/:title/edit" exact>
                <RecipeEdit />
              </Route>
              <Route>
                <RecipeView />
              </Route>
            </Switch>
          </BrowserRouter>
        </StaticDataProvider>
      </ApolloProvider>
    </>
  )
}

export default App
