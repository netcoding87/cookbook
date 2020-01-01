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
  h1,h2,h3,h4,h5,h6 {
    color: rgba(0,0,0,0.7);
  }
`

export default GlobalStyle
