import React from 'react'

import { Link, List, ListItem, Nav } from './Breadcrumbs.styles'

interface BreadcrumbsProps {
  items: { url: string; title: string }[]
  showHome?: boolean
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items: breadcrumbs,
  showHome = true,
  ...rest
}) => {
  return (
    <Nav aria-label="breadcrumbs" {...rest}>
      <List>
        {showHome && (
          <ListItem>
            <Link exact to="/">
              Home
            </Link>
          </ListItem>
        )}
        {breadcrumbs.map((breadcrumb, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={i}>
            <Link exact to={breadcrumb.url}>
              {breadcrumb.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Nav>
  )
}

export default Breadcrumbs
