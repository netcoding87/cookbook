import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { render as rtlRender } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

type RenderOptions = {
  url?: string
  mocks?: MockedResponse[]
}

export const render = (
  ui: React.ReactElement,
  { url = '/', mocks = [] }: RenderOptions = {}
) => {
  const history = createMemoryHistory({ initialEntries: [url] })
  return {
    ...rtlRender(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[url]}>{ui}</MemoryRouter>
      </MockedProvider>
    ),
    history,
  }
}
