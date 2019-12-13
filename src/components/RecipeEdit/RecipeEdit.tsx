import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import createDecorator from 'final-form-focus'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import {
  Field as FFField,
  Form as FFForm,
  FormSpy as FFFormSpy,
} from 'react-final-form'
import { useHistory, useParams } from 'react-router'
import useSWR from 'swr'

import { useImage } from '../../hooks'
import { RecipeData } from '../../interfaces'
import { ActionBar } from '../Header/Header.styles'
import Layout from '../Layout'
import Rating from '../Rating'
import Editor from './Editor'
import {
  ImageContainer,
  Input,
  RatingContainer,
  Select,
  UploadButton,
} from './RecipeEdit.styles'

const required = (value: unknown) =>
  value ? undefined : 'Diese Angabe ist erforderlich'

const focusOnError = createDecorator<RecipeData>()

const readImageFromFile = (file: File) => {
  const fileReader = new FileReader()

  return new Promise<string>((resolve, reject) => {
    fileReader.onerror = event => {
      fileReader.abort()
      reject(event)
    }

    fileReader.onload = () => {
      let dataURL = fileReader.result
      dataURL = (dataURL as string).replace(
        ';base64',
        `;name=${file.name};base64`
      )
      resolve(dataURL)
    }

    fileReader.readAsDataURL(file)
  })
}

const RecipeEdit: React.FC = () => {
  const history = useHistory()
  const { id } = useParams()

  const [image, setImage] = useState('')

  const { data } = useSWR<RecipeData>(
    `http://localhost:4000/recipes/${id}`,
    url => fetch(url).then(response => response.json())
  )

  const { image: dbImage } = useImage(id!)

  useEffect(() => {
    if (dbImage) {
      setImage(dbImage.image)
    }
  }, [dbImage])

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const imageData = await readImageFromFile(file)
        setImage(imageData)
      }
    }
  }

  const handleSubmit = async (values: RecipeData) => {
    await fetch(`http://localhost:4000/recipes/${values.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then(async () => {
      let imageUploadURL = `http://localhost:4000/images`
      let imageUploadMethod = `PUT`

      if (dbImage) {
        imageUploadURL = `http://localhost:4000/images/${dbImage.id}`
        imageUploadMethod = `PUT`
      }

      await fetch(imageUploadURL, {
        method: imageUploadMethod,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: image, recipeId: values.id }),
      }).then(() => history.push(`/recipe/${id}`))
    })
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <FFForm
        onSubmit={handleSubmit}
        initialValues={data}
        decorators={[focusOnError]}
        subscription={{ submitting: true }}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FFFormSpy subscription={{ values: true }}>
              {({ values }) => (
                <h1>
                  {values['title'] && values['title'].length > 0
                    ? values['title']
                    : '\u00A0'}
                </h1>
              )}
            </FFFormSpy>
            <hr />
            <Container fluid>
              <Row>
                <Col xs={12} sm={8} md={6}>
                  <FFField name="title" placeholder="Titel" validate={required}>
                    {({ input, meta, ...rest }) => (
                      <FormGroup controlId="title">
                        <FormLabel>Titel</FormLabel>
                        <Input
                          {...input}
                          {...rest}
                          isInvalid={meta.error && meta.touched}
                          required
                        />
                        {meta.error && meta.touched && (
                          <FormControl.Feedback type="invalid">
                            {meta.error}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  </FFField>
                  <FFField name="subtitle" placeholder="Untertitel">
                    {({ input, ...rest }) => (
                      <FormGroup controlId="subtitle">
                        <FormLabel>Untertitel</FormLabel>
                        <Input {...input} {...rest} />
                      </FormGroup>
                    )}
                  </FFField>
                  <FFField name="keywords" placeholder="Suchwörter">
                    {({ input, ...rest }) => (
                      <FormGroup controlId="keywords">
                        <FormLabel>Suchwörter</FormLabel>
                        <Input {...input} {...rest} />
                      </FormGroup>
                    )}
                  </FFField>
                  <FFField
                    name="tags"
                    placeholder="Kategorie"
                    validate={required}
                  >
                    {({ input, meta, ...rest }) => (
                      <FormGroup controlId="tags">
                        <FormLabel>Kategorie</FormLabel>
                        <Input
                          {...input}
                          {...rest}
                          isInvalid={meta.error && meta.touched}
                          required
                        />
                        <Select
                          defaultValue={{
                            value: 'chocolate',
                            label: 'Chocolate',
                          }}
                          isMulti
                          onChange={(value: unknown) => console.log(value)}
                          options={[
                            { value: 'chocolate', label: 'Chocolate' },
                            { value: 'strawberry', label: 'Strawberry' },
                            { value: 'vanilla', label: 'Vanilla' },
                          ]}
                          isInvalid={meta.error && meta.touched}
                          required
                        />
                        {meta.error && meta.touched && (
                          <FormControl.Feedback type="invalid">
                            {meta.error}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  </FFField>
                </Col>
                <Col xs={12} sm={4} md={6}>
                  <ImageContainer>
                    <UploadButton>
                      <label htmlFor="imageUpload">
                        {image ? (
                          <Image src={image} alt={data.title} rounded fluid />
                        ) : (
                          <FontAwesomeIcon
                            icon={['fas', 'image']}
                            color="#6c757d"
                            size="10x"
                          />
                        )}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="imageUpload"
                        onChange={handleImageUpload}
                      />
                    </UploadButton>
                  </ImageContainer>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <FFField
                    name="preparationTime"
                    placeholder="Vorbereitungszeit"
                  >
                    {({ input, ...rest }) => (
                      <FormGroup controlId="preparationTime">
                        <FormLabel>Vorbereitungszeit</FormLabel>
                        <Input {...input} {...rest} />
                      </FormGroup>
                    )}
                  </FFField>
                  <FFField
                    name="cookingTime"
                    placeholder="Back-/Kochzeit"
                    validate={required}
                  >
                    {({ input, meta, ...rest }) => (
                      <FormGroup controlId="cookingTime">
                        <FormLabel>Back-/Kochzeit</FormLabel>
                        <Input
                          {...input}
                          {...rest}
                          isInvalid={meta.error && meta.touched}
                          required
                        />
                        {meta.error && meta.touched && (
                          <FormControl.Feedback type="invalid">
                            {meta.error}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  </FFField>
                  <FFField name="restTime" placeholder="Ruhezeit">
                    {({ input, ...rest }) => (
                      <FormGroup controlId="restTime">
                        <FormLabel>Ruhezeit</FormLabel>
                        <Input {...input} {...rest} />
                      </FormGroup>
                    )}
                  </FFField>
                </Col>
                <Col sm={6}>
                  <FFField name="ranking" placeholder="Bewertung">
                    {({ input }) => (
                      <FormGroup controlId="ranking">
                        <FormLabel>Bewertung</FormLabel>
                        <RatingContainer>
                          <Rating
                            rating={input.value}
                            onChange={(value: number) => input.onChange(value)}
                          />
                        </RatingContainer>
                      </FormGroup>
                    )}
                  </FFField>
                  <FFField name="difficulty">
                    {({ input, ...rest }) => (
                      <FormGroup controlId="ranking">
                        <FormLabel>Schwierigkeit</FormLabel>
                        <div>
                          <ToggleButtonGroup
                            type="radio"
                            name="difficulty"
                            value={input.value}
                            onChange={(value: unknown) => input.onChange(value)}
                            {...rest}
                          >
                            <ToggleButton value={1} variant="outline-secondary">
                              Leicht
                            </ToggleButton>
                            <ToggleButton value={2} variant="outline-secondary">
                              Mittel
                            </ToggleButton>
                            <ToggleButton value={3} variant="outline-secondary">
                              Schwer
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </div>
                      </FormGroup>
                    )}
                  </FFField>
                  <FFField
                    name="servings"
                    placeholder="Anzahl der Portionen"
                    validate={required}
                  >
                    {({ input, meta, ...rest }) => (
                      <FormGroup controlId="servings">
                        <FormLabel>Anzahl der Portionen</FormLabel>
                        <Input
                          {...input}
                          {...rest}
                          isInvalid={meta.error && meta.touched}
                          required
                        />
                        {meta.error && meta.touched && (
                          <FormControl.Feedback type="invalid">
                            {meta.error}
                          </FormControl.Feedback>
                        )}
                      </FormGroup>
                    )}
                  </FFField>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <h5>Zutaten:</h5>
                </Col>
                <Col md={6}>
                  <FFField name="preparations">
                    {({ input }) => (
                      <FormGroup controlId="preparations">
                        <FormLabel>
                          <h5>Zubereitung:</h5>
                        </FormLabel>
                        <Editor
                          value={input.value}
                          onChange={value => input.onChange(value)}
                        />
                      </FormGroup>
                    )}
                  </FFField>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FFField name="source" placeholder="Quelle">
                    {({ input, ...rest }) => (
                      <FormGroup controlId="source">
                        <FormLabel>Quelle</FormLabel>
                        <Input {...input} {...rest} />
                      </FormGroup>
                    )}
                  </FFField>
                </Col>
              </Row>
            </Container>
            <ActionBar>
              <Button type="submit" disabled={submitting || pristine}>
                Save
              </Button>
              <Button onClick={() => history.goBack()}>Cancel</Button>
            </ActionBar>
          </form>
        )}
      </FFForm>
    </Layout>
  )
}

export default RecipeEdit
