import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components/macro'

interface InputProps {
  required?: boolean
}

export const Input = styled(FormControl)<{ required?: boolean }>`
  border-left: ${props => props.required && '5px solid #42A948'};

  &.is-invalid {
    border-left: ${props => props.required && '5px solid #a94442'};
    background-color: ${props => props.required && 'rgba(169, 68, 66, 0.30)'};
  }

  &.is-invalid:focus {
    border-left: ${props => props.required && '5px solid #80bdff'};
    background-color: ${props => props.required && '#fff'};

    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`
