import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { ImageData, RecipeData } from '../../interfaces'
import Layout from '../Layout'
import NoImage from './camera.png'

const Dashboard: React.FC = () => {
  const { data } = useSWR<RecipeData[]>('http://localhost:4000/recipes', url =>
    fetch(url).then(response => response.json())
  )

  const { data: imageData } = useSWR<ImageData[]>(
    'http://localhost:4000/images',
    url => fetch(url).then(response => response.json())
  )

  if (!data) {
    return <div>Loading...</div>
  }

  if (!imageData) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Container fluid>
        <Row>
          {data.map(item => {
            const img = imageData.find(image => image.recipeId === item.id)
            return (
              <Col key={item.id} xs={12} sm={4} md={3}>
                <Link to={`recipe/${item.id}`}>
                  <Card bg="light">
                    <Card.Img variant="top" src={img ? img.image : NoImage} />
                    <Card.Body>
                      X X X X X<Card.Title>{item.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Row>
      </Container>
    </Layout>
  )
}

export default Dashboard
