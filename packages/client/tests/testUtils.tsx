import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { render as rtlRender } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

export const render = (
  ui: React.ReactElement,
  mocks: MockedResponse[] = []
) => {
  return rtlRender(
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>
  )
}

type RenderOptions = {
  route?: string
  history?: MemoryHistory<unknown>
  mocks?: MockedResponse[]
}

export const renderWithRouter = (
  ui: React.ReactElement,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    mocks = [],
  }: RenderOptions = {}
) => {
  return {
    ...rtlRender(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </MockedProvider>
    ),
    history,
  }
}
