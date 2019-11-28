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
  ul, ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`

export default GlobalStyle
