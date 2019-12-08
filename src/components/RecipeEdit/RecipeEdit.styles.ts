import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components/macro'

interface InputProps {
  required?: boolean
}

export const Input = styled(FormControl)<{ required?: boolean }>`
  border-left: ${props => props.required && '5px solid #42A948'};

  &:invalid {
    border-left: ${props => props.required && '5px solid #a94442'};
    background-color: ${props => props.required && 'rgba(169, 68, 66, 0.30)'};
  }

  &:focus {
    border-left: ${props => props.required && '5px solid #80bdff'};
    background-color: #fff;
  }
`

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`
