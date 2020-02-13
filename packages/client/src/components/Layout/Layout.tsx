import React from 'react'

import Header from '../Header'
import { Content } from './Layout.styles'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  )
}

export default Layout
