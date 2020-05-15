import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Nav = styled.nav`
  color: hsl(0, 0%, 74%);
  margin-bottom: 16px;
`

export const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const ListItem = styled.li`
  margin-right: 20px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 22.5%;
    background: hsl(0, 0%, 61%);
    right: -10px;
    height: 55%;
    width: 1px;
    transform: skewX(-22deg);
  }
`

export const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 3px;
  color: hsl(0, 0%, 61%);
  font-size: 14px;
  height: 24px;
  padding: 0 4px;

  &:hover {
    color: hsl(0, 0%, 61%);
  }

  [data-whatinput='keyboard'] &:focus {
    outline: 2px solid hsl(218, 100%, 83%);
  }
`
