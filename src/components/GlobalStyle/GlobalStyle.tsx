import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyle = createGlobalStyle<{}>`
  *, ::before, ::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background: #f4f4f4;
    overflow-x: hidden;
  }
`

export default GlobalStyle
