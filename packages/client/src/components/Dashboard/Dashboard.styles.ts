import styled from 'styled-components/macro'

export const CategoryTitle = styled.h2`
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.75em;

  & > :not(:first-child) {
    margin: 24px auto;
  }
`

export const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const SliderIcon = styled.div`
  color: #ddd;
  margin-right: 8px;
`

export const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 15px;
  right: 25px;
  width: 200px;

  border: 1px solid transparent;
  padding: 12px;

  &:hover {
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #eef8fffa;

    ${SliderIcon} {
      color: #aaa;
    }
  }
`
