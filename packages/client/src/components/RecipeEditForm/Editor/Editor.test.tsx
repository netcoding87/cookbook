import { fireEvent, screen } from '@testing-library/dom'
import React, { FocusEvent } from 'react'

import { render } from '../../../../tests/testUtils'
import Editor from './Editor'

jest.mock('jodit-react', () => {
  const mockJoditEditor = (value: string, onBlur: (value: string) => void) => {
    const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      onBlur(event.target.value)
    }
    return <textarea defaultValue={value} onBlur={handleBlur}></textarea>
  }

  return function ({ value, onBlur }) {
    return mockJoditEditor(value, onBlur)
  }
})

describe('<Editor />', () => {
  it('should fire onChange event on text enter', async () => {
    // Arrange
    const handleChange = jest.fn()
    render(<Editor value="Some predefined text" onChange={handleChange} />)

    // Act
    fireEvent.blur(screen.getByRole('textbox'), {
      target: { value: 'Input from test' },
    })

    // // Assert
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith('Input from test')
  })
})
