import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const RecipeCardLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 8px;
  margin-bottom: 0;

  height: 112px;
  overflow: hidden;
`

export const RecipeCardContainer = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;

  width: ${props => `${props.width}px`};

  margin: 12px;

  background-color: #e4e4e4;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;

  &:hover {
    background-color: #dae0e5;
  }

  & ${ImageContainer} {
    height: calc(${props => props.width} * 0.65px);
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 8px;
`

export const RecipeTitle = styled.div`
  color: #868e96;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;

  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`
