import styled from 'styled-components/macro'

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  height: 100%;

  @media print {
    width: 100%;
    height: auto;
  }
`

export const Gutter = styled.div`
  height: 36px;
`

export const NonPrint = styled.div`
  @media print {
    display: none;
  }
`
