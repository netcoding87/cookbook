import React, { useState } from 'react'

import Footer from '../footer'
import Header from '../header'
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
      Content <button onClick={fetchData}>Fetch</button>
      <hr />
      {JSON.stringify(data)}
      <Footer>Footer</Footer>
    </>
  )
}

export default App
