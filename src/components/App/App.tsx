import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GlobalStyle from '../GlobalStyle'
import RecipeEdit from '../RecipeEdit'
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
    </>
  )
}

export default App
