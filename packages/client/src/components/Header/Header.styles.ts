import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Head = styled.header`
  background: #17a2b8;
  min-height: 48px;

  box-shadow: 0px 0px 32px #17a2b8;

  padding: 8px;

  @media print {
    display: none;
  }
`

export const StyledLink = styled(Link)`
  text-decoration: none;

  display: flex;
  align-items: center;
`

export const Title = styled.h1`
  color: #efede8;
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Gloria Hallelujah';
  margin: 0 8px;
`
