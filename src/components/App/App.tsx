import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GlobalStyle from '../GlobalStyle'
import RecipeEdit from '../RecipeEdit'
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
            <Route path="/recipe/:id" exact>
              <RecipeView />
            </Route>
            <Route path="/recipe/:id/edit" exact>
              <RecipeEdit />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>
      </StaticDataProvider>
    </>
  )
}

export default App
