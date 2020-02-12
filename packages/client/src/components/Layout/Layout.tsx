import React from 'react'

import Footer from '../Footer'
import Header from '../Header'
import { Content } from './Layout.styles'

interface LayoutProps {
  footer?: boolean
}

const Layout: React.FC<LayoutProps> = ({ footer = false, children }) => {
  return (
    <>
      <Header />
      <Content footer={footer}>{children}</Content>
      {footer && <Footer />}
    </>
  )
}

export default Layout
