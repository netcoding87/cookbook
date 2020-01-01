import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { RecipeData } from '../../interfaces'
import { ActionBar } from '../ActionBar'
import Layout from '../Layout'
import Rating from '../Rating'
import RecipeImage from '../RecipeImage'
import IngredientsView from './IngredientsView'
import PreparationView from './PreparationView'
import { Gutter, ImageContainer, NonPrint } from './RecipeView.styles'

const RecipeView: React.FC = () => {
  const { id } = useParams()
  const { data } = useSWR<RecipeData>(
    `http://localhost:4000/recipes/${id}`,
    url => fetch(url).then(response => response.json())
  )

  if (!data) {
    return <div>Loading...</div>
  }

  const difficulty =
    data.difficulty === 0
      ? 'Leicht'
      : data.difficulty === 1
      ? 'Mittel'
      : 'Schwer'

  return (
    <Layout>
      <Container fluid>
        <h1>{data.title}</h1>
        {data.subtitle && <div>{data.subtitle}</div>}
      </Container>
      <hr />
      <Container fluid>
        {data.servings && <div>Portionen: {data.servings}</div>}
        {data.preparationTime && (
          <div>Vorbereitungszeit: {data.preparationTime}</div>
        )}
        <div>Back- / Kochzeit: {data.cookingTime}</div>
        {data.restTime && <div>Ruhezeit: {data.restTime}</div>}
      </Container>
      <hr />
      <Container fluid>
        <Row>
          <Col>
            <Suspense fallback={<div>Loading recipe data...</div>}>
              <IngredientsView recipe={data} />
              <Gutter />
              <PreparationView preparations={data.preparations} />
            </Suspense>
          </Col>
          <Col sm={6}>
            <ImageContainer>
              <RecipeImage id={id!} title={data.title} fluid />
            </ImageContainer>
          </Col>
        </Row>
      </Container>
      <NonPrint>
        <hr />
        <Container fluid>
          <Rating rating={data.ranking} readonly /> | Schwierigkeit:{' '}
          {difficulty}
        </Container>
        <hr />
        <Container fluid>
          <ActionBar>
            <Button
              variant="primary"
              onClick={() => {
                window.print()
              }}
            >
              <FontAwesomeIcon icon={['fas', 'print']} /> Drucken
            </Button>
            <Link to={`/recipe/${id}/edit`}>
              <Button variant="outline-secondary">
                <FontAwesomeIcon icon={['fas', 'edit']} /> Bearbeiten
              </Button>
            </Link>
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={['fas', 'trash']} /> Löschen
            </Button>
          </ActionBar>
        </Container>
      </NonPrint>
    </Layout>
  )
}

export default RecipeView
