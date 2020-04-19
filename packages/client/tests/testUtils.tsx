import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { render as rtlRender } from '@testing-library/react'
import React from 'react'

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
