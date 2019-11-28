import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../Dashboard'
import Header from '../Header'
import './App.css'

const App: React.FC = () => {
  const [data, setData] = useState('')
  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/categories')
    const myJson = await response.json()
    console.log(myJson)
    setData(myJson)
  }

  return (
    <>
      <Header></Header>
      <div style={{ marginTop: '24px' }}>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>
        Content <button onClick={fetchData}>Fetch</button>
        <hr />
        {JSON.stringify(data)}
        {/* <Footer>Footer</Footer> */}
      </div>
    </>
  )
}

export default App
