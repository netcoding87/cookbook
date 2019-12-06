import React from 'react'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import {
  Field as FFField,
  Form as FFForm,
  FormSpy as FFFormSpy,
} from 'react-final-form'
import { useHistory, useParams } from 'react-router'
import useSWR from 'swr'

import { RecipeData } from '../../interfaces'
import { ActionBar } from '../Header/Header.styles'
import Layout from '../Layout'
import { Input } from './RecipeEdit.styles'

const RecipeEdit: React.FC = () => {
  const history = useHistory()
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
      Recipe Edit
      <hr />
      <FFForm
        onSubmit={values => console.log(JSON.stringify(values))}
        initialValues={data}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h1>
              <FFFormSpy subscription={{ values: true }}>
                {({ values }) =>
                  values['title'] && values['title'].length > 0 ? (
                    values['title']
                  ) : (
                    <i>No title...</i>
                  )
                }
              </FFFormSpy>
            </h1>
            <FormGroup controlId="title">
              <FormLabel>Titel</FormLabel>
              <FFField name="title" placeholder="Titel">
                {({ input }) => <Input {...input} required />}
              </FFField>
            </FormGroup>
            <FormGroup controlId="subtitle">
              <FormLabel>Untertitel</FormLabel>
              <FFField name="subtitle" placeholder="Untertitel">
                {({ input }) => <Input {...input} />}
              </FFField>
            </FormGroup>
            <ActionBar>
              <Button type="submit">Save</Button>
              <Button onClick={() => history.goBack()}>Cancel</Button>
            </ActionBar>
          </form>
        )}
      </FFForm>
    </Layout>
  )
}

export default RecipeEdit
