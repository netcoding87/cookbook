import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../Dashboard'
import GlobalStyle from '../GlobalStyle'
import Header from '../Header'

const App: React.FC = () => {
  return (
    <>
      <Header></Header>
      <div style={{ marginTop: '24px' }}>
        <BrowserRouter>
          <GlobalStyle />
          <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
