import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Breadcrumbs from './Breadcrumbs'

describe('<Breadcrumps />', () => {
  it('should render simple breadcrumbs with fake URL', async () => {
    render(
      <Router>
        <Breadcrumbs
          items={[
            { url: window.location.href, title: 'Lorem' },
            { url: window.location.href, title: 'ipsum' },
            { url: window.location.href, title: 'dolor' },
            { url: window.location.href, title: 'sit' },
            { url: window.location.href, title: 'amet' },
            { url: window.location.href, title: 'consetetur' },
            { url: window.location.href, title: 'sadipscing' },
          ]}
        />
      </Router>
    )
  })

  it('should render empty title', async () => {
    render(
      <Router>
        <Breadcrumbs items={[{ url: window.location.href, title: '' }]} />
      </Router>
    )
  })

  it('should render with empty URL', async () => {
    render(
      <Router>
        <Breadcrumbs items={[{ url: '', title: '' }]} />
      </Router>
    )
  })
})
