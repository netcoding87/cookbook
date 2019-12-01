import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GlobalStyle from '../GlobalStyle'
import RecipeView from '../RecipeView'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/recipe/:id">
            <RecipeView />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
