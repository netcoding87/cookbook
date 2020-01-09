import styled from 'styled-components/macro'

interface ActionBarProps {
  position?: 'left' | 'right'
}

export const ActionBar = styled.div<ActionBarProps>`
  display: flex;
  justify-content: ${props =>
    !props.position || props.position === 'left' ? 'flex-start' : 'flex-end'};
  align-items: center;

  & > :not(:first-child) {
    margin-left: 8px;
  }
`
