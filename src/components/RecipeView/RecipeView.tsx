import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { RecipeData } from '../../interfaces'
import Layout from '../Layout'
import Rating from '../Rating'
import RecipeImage from '../RecipeImage'
import IngredientsView from './IngredientsView'
import { ImageContainer } from './RecipeView.styles'

const RecipeView: React.FC = () => {
  const { id } = useParams()
  const { data } = useSWR<RecipeData>(
    `http://localhost:4000/recipes/${id}`,
    url => fetch(url).then(response => response.json())
  )

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <h1>{data.title}</h1>
      {data.subtitle && <div>{data.subtitle}</div>}
      <div>
        <Rating rating={data.ranking} readonly /> | Schwierigkeit: Mittel
      </div>
      <hr />
      <Container fluid>
        <Row>
          <Col>
            <IngredientsView recipe={data} />
          </Col>
          <Col sm={6}>
            <ImageContainer>
              <RecipeImage id={id!} title={data.title} fluid />
            </ImageContainer>
          </Col>
        </Row>
      </Container>
      <hr />
      <Link to={`/recipe/${id}/edit`}>
        <Button variant="outline-primary">Edit</Button>
      </Link>
      <Button variant="outline-secondary">Delete</Button>
    </Layout>
  )
}

export default RecipeView
