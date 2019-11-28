import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import { Head } from './Header.styles'

const Header: React.FC = () => {
  return (
    <Head>
      Head
      <span>
        <Button variant="secondary">
          <FontAwesomeIcon icon="plus" />
        </Button>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">
              <FontAwesomeIcon icon="search" />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            placeholder="Search"
            aria-describedby="inputGroupPrepend"
          />
        </InputGroup>
      </span>
    </Head>
  )
}

export default Header
