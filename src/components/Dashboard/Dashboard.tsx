import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import useSWR from 'swr'

import { RecipeData } from '../../interfaces'
import Layout from '../Layout'
import RecipeCard from '../RecipeCard'

const Dashboard: React.FC = () => {
  const { data } = useSWR<RecipeData[]>('http://localhost:4000/recipes', url =>
    fetch(url).then(response => response.json())
  )

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Container fluid>
        <Row>
          {data.map(recipe => {
            return <RecipeCard key={recipe.id} recipe={recipe} />
          })}
        </Row>
      </Container>
    </Layout>
  )
}

export default Dashboard
