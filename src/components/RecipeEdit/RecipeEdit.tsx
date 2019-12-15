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
import { useHistory, useParams } from 'react-router-dom'
import Select, { ValueType } from 'react-select'
import AsyncCreatableSelect from 'react-select/async-creatable'
import useSWR from 'swr'

import { useImage } from '../../hooks'
import { RecipeData } from '../../interfaces'
import { ActionBar } from '../Header/Header.styles'
import Layout from '../Layout'
import { useMeasures } from '../MeasuresProvider/MeasuresProvider'
import Rating from '../Rating'
import Editor from './Editor'
import IngredientsEditor from './IngredientsEditor'
import {
  ImageContainer,
  Input,
  RatingContainer,
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

const distinctArray = (array: string[]) => {
  return Array.from(new Set(array.map((item: string) => item)))
}

interface SelectOption {
  label: string
  value: string
}

const promiseTags = async (value: string) => {
  const fetchTags = (): Promise<string[]> => {
    return new Promise(resolve => {
      fetch('http://localhost:4000/recipes')
        .then(response => response.json())
        .then((body: RecipeData[]) => {
          let tagsString = ''
          body.forEach(item => {
            if (item.tags && item.tags.trim().length > 0) {
              tagsString += `${item.tags.trim()};`
            }
          })
          return resolve(tagsString.slice(0, -1).split(';'))
        })
    })
  }

  let data = await fetchTags()

  data = distinctArray(data)

  // console.log(data)
  data = data.sort((a, b) => a.localeCompare(b))
  // console.log(data)

  let arr: SelectOption[] = []
  data.forEach(item => {
    arr.push({ value: item.toLowerCase(), label: item })
  })

  // console.log(arr)

  arr = arr.filter(item =>
    item.label.toLowerCase().includes(value.toLowerCase())
  )

  // console.log(arr)

  return arr
}

const RecipeEdit: React.FC = () => {
  const history = useHistory()
  const { id } = useParams()

  const tags: SelectOption[] = []

  const [recipe, setRecipe] = useState<RecipeData>()
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState<SelectOption[]>([])

  const { data: dbRecipes } = useSWR<RecipeData[]>(
    `http://localhost:4000/recipes`,
    url => fetch(url).then(response => response.json())
  )

  const { image: dbImage } = useImage(id!)
  const { categories: dbCategories } = useMeasures()

  useEffect(() => {
    if (dbImage) {
      setImage(dbImage.image)
    }
  }, [dbImage])

  useEffect(() => {
    if (dbCategories) {
      setCategories(
        dbCategories.map(category => ({
          label: category.name,
          value: category.id,
        }))
      )
    }
  }, [dbCategories])

  useEffect(() => {
    if (dbRecipes) {
      const dbRecipe = dbRecipes.filter(
        dbRecipe => dbRecipe.id.toString() === id
      )

      if (dbRecipe.length === 1) {
        const recipe = dbRecipe[0]

        // console.log(tags)
        // console.log(recipe.tags)
        recipe.tags &&
          recipe.tags
            .split(';')
            .sort((a, b) => a.localeCompare(b))
            .forEach(tag => tags.push({ label: tag, value: tag.toLowerCase() }))

        // console.log(tags)
        setRecipe(recipe)
      }
    }

    if (recipe) {
      recipe.tags &&
        recipe.tags
          .split(';')
          .sort((a, b) => a.localeCompare(b))
          .forEach(tag => tags.push({ label: tag, value: tag.toLowerCase() }))
    }
  }, [dbRecipes, id, recipe, tags])

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

  if (!dbRecipes || !recipe) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <FFForm
        onSubmit={handleSubmit}
        initialValues={recipe}
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
                  <FFField name="tags" placeholder="Suchwörter">
                    {({ input }) => (
                      <FormGroup controlId="tags">
                        <FormLabel>Suchwörter</FormLabel>
                        <AsyncCreatableSelect
                          // defaultValue={tags}
                          isMulti
                          onChange={value => {
                            const newValue = ''

                            // if (value) {
                            //   value.forEach(item => {
                            //     if (newValue.length > 0) {
                            //       newValue += ';'
                            //     }

                            //     newValue += item.label
                            //   })
                            // }

                            input.onChange(newValue)
                          }}
                          loadOptions={promiseTags}
                          cacheOptions
                          defaultOptions
                        />
                      </FormGroup>
                    )}
                  </FFField>
                  <FFField name="categoryId" placeholder="Kategorie">
                    {({ input }) => (
                      <FormGroup controlId="categoryId">
                        <FormLabel>Kategorie</FormLabel>
                        <Select
                          defaultValue={
                            categories[
                              categories.findIndex(
                                category => category.value === recipe.categoryId
                              )
                            ]
                          }
                          options={categories}
                          onChange={(value: ValueType<SelectOption>) => {
                            if (value) {
                              input.onChange((value as SelectOption).value)
                            }
                          }}
                        />
                      </FormGroup>
                    )}
                  </FFField>
                </Col>
                <Col xs={12} sm={4} md={6}>
                  <ImageContainer>
                    <UploadButton>
                      <label htmlFor="imageUpload">
                        {image ? (
                          <Image src={image} alt={recipe.title} rounded fluid />
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
                  <FFField name="cookingTime" placeholder="Back-/Kochzeit">
                    {({ input, ...rest }) => (
                      <FormGroup controlId="cookingTime">
                        <FormLabel>Back-/Kochzeit</FormLabel>
                        <Input {...input} {...rest} />
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
                  <FFField name="servings" placeholder="Anzahl der Portionen">
                    {({ input, ...rest }) => (
                      <FormGroup controlId="servings">
                        <FormLabel>Anzahl der Portionen</FormLabel>
                        <Input {...input} {...rest} />
                      </FormGroup>
                    )}
                  </FFField>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <h5>Zutaten:</h5>
                  <IngredientsEditor recipe={recipe} />
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
