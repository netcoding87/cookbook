import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useHistory, useParams } from 'react-router'
import useSWR from 'swr'

import { RecipeData } from '../../interfaces'
import { ActionBar } from '../Header/Header.styles'
import Layout from '../Layout'
import { Input } from './RecipeEdit.styles'

const RecipeEdit: React.FC = () => {
  const history = useHistory()
  const { id } = useParams()

  const [title, setTitle] = useState('')

  const { data } = useSWR<RecipeData>(
    `http://localhost:4000/recipes/${id}`,
    url => fetch(url).then(response => response.json()),
    {
      onSuccess: data => {
        console.log(data)
        setTitle(data.title)
      },
    }
  )

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    setTitle(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    form.checkValidity()
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      Recipe Edit
      <hr />
      <h1>{title.length > 0 ? title : <i>No title...</i>}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Titel</Form.Label>
          <Input
            type="type"
            placeholder="Titel"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Untertitel</Form.Label>
          <Input type="type" placeholder="Untertitel" />
        </Form.Group>
      </Form>
      <ActionBar>
        <Button type="submit">Save</Button>
        <Button onClick={() => history.goBack()}>Cancel</Button>
      </ActionBar>
    </Layout>
  )
}

export default RecipeEdit
