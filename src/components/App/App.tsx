import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GlobalStyle from '../GlobalStyle'
import MeasuresProvider from '../MeasuresProvider'
import RecipeEdit from '../RecipeEdit'
import RecipeView from '../RecipeView'

const App: React.FC = () => {
  return (
    <>
      <MeasuresProvider>
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
      </MeasuresProvider>
    </>
  )
}

export default App
