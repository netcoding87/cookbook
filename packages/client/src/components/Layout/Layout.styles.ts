import styled from 'styled-components/macro'

export const Content = styled.main<{ footer: boolean }>`
  margin-top: 24px;
  margin-bottom: ${props => (props.footer ? '64px' : '0px')};
  padding: 24px;
`
