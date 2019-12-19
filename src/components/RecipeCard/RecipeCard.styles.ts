import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const RecipeCardLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

export const RecipeCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  margin-bottom: 24px;

  background-color: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;

  &:hover {
    background-color: #dae0e5;
  }
`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 175px;
  overflow: hidden;
  /* border: 1px solid red; */
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 12px;
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
