import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'

import logo from './favicon-32x32.png'
import { ActionBar, Head, StyledLink, Title } from './Header.styles'

const Header: React.FC = () => {
  return (
    <Head>
      <Container fluid>
        <Row>
          <Col xs={12} md={8}>
            <StyledLink to="/" style={{ textDecoration: 'none' }}>
              <img src={logo} alt="Logo" />
              <Title>Cookbook</Title>
            </StyledLink>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex align-items-center justify-content-end"
          >
            <ActionBar>
              <Button variant="secondary">
                <FontAwesomeIcon icon="plus" />
              </Button>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <FontAwesomeIcon icon="search" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text"
                  placeholder="Search..."
                  aria-describedby="inputGroupPrepend"
                />
              </InputGroup>
            </ActionBar>
          </Col>
        </Row>
      </Container>
    </Head>
  )
}

export default Header
