import styled from 'styled-components/macro'

export const Head = styled.header`
  background: #17a2b8;
  min-height: 48px;

  border-bottom: 4px #ffc107 solid;
  box-shadow: 0px 4px 4px #ffc107;

  padding: 8px;
`

export const Title = styled.h1`
  /* color: #f2b27c; */
  color: #efede8;
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Gloria Hallelujah';
  margin: 0 8px;
`

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > :not(:first-child) {
    margin-left: 8px;
  }
`
