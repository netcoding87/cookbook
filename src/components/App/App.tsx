import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GlobalStyle from '../GlobalStyle'
import RecipeEdit from '../RecipeEdit'
import RecipeNew from '../RecipeNew'
import RecipeView from '../RecipeView'
import StaticDataProvider from '../StaticDataProvider'

const App: React.FC = () => {
  return (
    <>
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
            <Route path="/recipe/:id" exact>
              <RecipeView />
            </Route>
            <Route path="/recipe/:id/edit" exact>
              <RecipeEdit />
            </Route>
            <Route>
              <RecipeView />
            </Route>
          </Switch>
        </BrowserRouter>
      </StaticDataProvider>
    </>
  )
}

export default App
