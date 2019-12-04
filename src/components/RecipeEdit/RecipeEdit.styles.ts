import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components/macro'

interface InputProps {
  required?: boolean
}

export const Input = styled(FormControl)<{ required?: boolean }>`
  border-left: ${props => props.required && '5px solid #42A948'};
`
