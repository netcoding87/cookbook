import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDeleteRecipeMutation, useRecipeViewQuery } from '../../typings/generated.d'
import { ActionBar } from '../ActionBar'
import Layout from '../Layout'
import Rating from '../Rating'
import RecipeImage from '../RecipeImage'
import IngredientsView from './IngredientsView'
import PreparationView from './PreparationView'
import { Gutter, ImageContainer, NonPrint } from './RecipeView.styles'


const RecipeView: React.FC = () => {
  const history = useHistory()
  const { id, title } = useParams()

  const { data } = useRecipeViewQuery({
    variables: {
      id: id!,
    },
  })
  const [deleteRecipeMutation] = useDeleteRecipeMutation()

  const [showModal, setShowModal] = useState(false)

  const handleDelete = async () => {
    const response = await deleteRecipeMutation({ variables: { id: id! } })

    if (response.data) {
      history.push('/')
    }
  }

  const handleDialogOpen = () => {
    setShowModal(true)
  }

  const handleDialogClose = () => {
    setShowModal(false)
  }

  if (!data || !data.recipe) {
    return <div>Loading...</div>
  }

  if (data.recipe.title !== title) {
    // TODO: Return NotFoundPage when implemented
    return <Layout>Invalid!</Layout>
  }

  const difficulty =
    data.recipe.difficulty === 0
      ? 'Leicht'
      : data.recipe.difficulty === 1
      ? 'Mittel'
      : 'Schwer'

  return (
    <Layout>
      <Container fluid>
        <h1>{data.recipe.title}</h1>
        {data.recipe.subtitle && <div>{data.recipe.subtitle}</div>}
      </Container>
      <hr />
      <Container fluid>
        {data.recipe.servings && <div>Portionen: {data.recipe.servings}</div>}
        {data.recipe.preparationTime && (
          <div>Vorbereitungszeit: {data.recipe.preparationTime}</div>
        )}
        <div>Back- / Kochzeit: {data.recipe.cookingTime}</div>
        {data.recipe.restTime && <div>Ruhezeit: {data.recipe.restTime}</div>}
      </Container>
      <hr />
      <Container fluid>
        <Row>
          <Col>
            <Suspense fallback={<div>Loading recipe data...</div>}>
              <IngredientsView ingredients={data.recipe.ingredients} />
              <Gutter />
              <PreparationView preparations={data.recipe.preparations} />
            </Suspense>
          </Col>
          <Col sm={6}>
            <ImageContainer>
              <RecipeImage id={id!} title={data.recipe.title} fluid />
            </ImageContainer>
          </Col>
        </Row>
      </Container>
      <NonPrint>
        <hr />
        <Container fluid>
          <Rating rating={data.recipe.ranking} readonly /> | Schwierigkeit:{' '}
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
            <Link to={`/recipe/${id}/${data.recipe.title}/edit`}>
              <Button variant="outline-secondary">
                <FontAwesomeIcon icon={['fas', 'edit']} /> Bearbeiten
              </Button>
            </Link>
            <Button variant="outline-secondary" onClick={handleDialogOpen}>
              <FontAwesomeIcon icon={['fas', 'trash']} /> Löschen
            </Button>
          </ActionBar>
        </Container>
      </NonPrint>
      <Modal size="sm" show={showModal} onHide={handleDialogClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Löschen</Modal.Title>
        </Modal.Header>
        <Modal.Body>Möchten Sie dieses Rezept wirklich löschen?</Modal.Body>
        <Modal.Footer>
          <ActionBar position="right">
            <Button variant="primary" onClick={handleDelete}>
              <FontAwesomeIcon icon={['fas', 'check']} /> Ja
            </Button>
            <Button variant="outline-secondary" onClick={handleDialogClose}>
              <FontAwesomeIcon icon={['fas', 'times']} /> Nein
            </Button>
          </ActionBar>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default RecipeView
