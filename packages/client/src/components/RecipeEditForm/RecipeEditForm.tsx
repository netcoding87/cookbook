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
import { Field, Form, FormSpy } from 'react-final-form'
import { useHistory } from 'react-router-dom'
import Select, { ValueType } from 'react-select'
import CreatableSelect from 'react-select/creatable'

import { useTags } from '../../hooks'
import {
  CategoryData,
  IngredientData,
  MeasureData,
  RecipeData,
} from '../../typings/generated.d'
import { ActionBar } from '../ActionBar'
import Rating from '../Rating'
import { useStaticData } from '../StaticDataProvider'
import Editor from './Editor'
import IngredientsEditor from './IngredientsEditor'
import {
  ImageContainer,
  Input,
  RatingContainer,
  UploadButton,
} from './RecipeEditForm.styles'

export type RecipeEditFormRecipeData = Pick<
  RecipeData,
  | 'id'
  | 'title'
  | 'subtitle'
  | 'tags'
  | 'ranking'
  | 'servings'
  | 'difficulty'
  | 'preparationTime'
  | 'cookingTime'
  | 'restTime'
  | 'preparations'
  | 'source'
> & { category: Pick<CategoryData, 'id'> }

export type RecipeEditFormIngredientData = Pick<
  IngredientData,
  'amount' | 'ingredient'
> & { measure: Pick<MeasureData, 'id'> }

const tagSeparator = ','

const focusOnError = createDecorator<RecipeEditFormRecipeData>()

const required = (value: unknown) =>
  value ? undefined : 'Diese Angabe ist erforderlich'

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

interface SelectOption {
  label: string
  value: string | number
}

interface RecipeEditFormProps {
  recipe: RecipeEditFormRecipeData
  ingredients?: RecipeEditFormIngredientData[]
  image?: string
  onSubmit: (
    recipe: RecipeEditFormRecipeData,
    ingredients: RecipeEditFormIngredientData[],
    image: string | null
  ) => void
}

const RecipeEditForm: React.FC<RecipeEditFormProps> = ({
  recipe,
  onSubmit,
  ...rest
}) => {
  const [image, setImage] = useState<string | null>(null)
  const [ingredients, setIngredients] = useState<
    RecipeEditFormIngredientData[]
  >(rest.ingredients ? rest.ingredients : [])

  useEffect(() => {
    rest.image && setImage(rest.image)
  }, [rest.image])

  useEffect(() => {
    rest.ingredients && setIngredients(rest.ingredients)
  }, [rest.ingredients])

  const { tags } = useTags()
  const { categories } = useStaticData()

  const history = useHistory()

  const handleSubmit = async (values: RecipeEditFormRecipeData) => {
    onSubmit(values, ingredients, image)
  }

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

  const handleIngredientAdd = (
    amount: string,
    measure: string,
    ingredient: string
  ) => {
    setIngredients(ingredients => {
      ingredients.push({
        amount: amount,
        ingredient: ingredient,
        measure: { id: measure },
      })
      return ingredients
    })
  }

  const handleIngredientDelete = (ingredient: RecipeEditFormIngredientData) => {
    setIngredients(ingredients.filter(item => item !== ingredient))
  }

  const handleIngredientChange = (
    ingredient: RecipeEditFormIngredientData,
    field: string,
    value: unknown
  ) => {
    setIngredients(ingredients =>
      ingredients.map(item => {
        if (item === ingredient) {
          return {
            ...item,
            [field]: value,
          }
        }
        return item
      })
    )
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={recipe}
      decorators={[focusOnError]}
      subscription={{ submitting: true }}
    >
      {({ handleSubmit, submitting, pristine }) => (
        <form noValidate onSubmit={handleSubmit}>
          <FormSpy subscription={{ values: true }}>
            {({ values }) => (
              <h1>
                {values['title'] && values['title'].length > 0 ? (
                  values['title']
                ) : (
                  <i>Rezept</i>
                )}
              </h1>
            )}
          </FormSpy>
          <hr />
          <Container fluid>
            <Row>
              <Col xs={12} sm={8} md={6}>
                <Field name="title" placeholder="Titel" validate={required}>
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
                </Field>
                <Field name="subtitle" placeholder="Untertitel">
                  {({ input, ...rest }) => (
                    <FormGroup controlId="subtitle">
                      <FormLabel>Untertitel</FormLabel>
                      <Input {...input} {...rest} />
                    </FormGroup>
                  )}
                </Field>
                <Field name="tags" placeholder="Suchwörter">
                  {({ input }) => (
                    <FormGroup controlId="tags">
                      <FormLabel>Suchwörter</FormLabel>
                      <CreatableSelect
                        defaultValue={
                          recipe.tags
                            ? recipe.tags
                                .split(tagSeparator)
                                .sort((a, b) => a.localeCompare(b))
                                .map(tag => ({
                                  value: tag.toLowerCase(),
                                  label: tag,
                                }))
                            : []
                        }
                        isMulti
                        onChange={value => {
                          if (value) {
                            const values = value as SelectOption[]

                            let newValue = ''
                            values.forEach(option => {
                              if (newValue.length > 0) {
                                newValue += tagSeparator
                              }

                              newValue += option.label
                            })
                            input.onChange(newValue)
                          }
                        }}
                        options={tags.map(tag => ({
                          value: tag.toLowerCase(),
                          label: tag,
                        }))}
                      />
                    </FormGroup>
                  )}
                </Field>
                <Field name="category.id" placeholder="Kategorie">
                  {({ input }) => (
                    <FormGroup controlId="categoryId">
                      <FormLabel>Kategorie</FormLabel>
                      <Select
                        defaultValue={categories
                          .filter(
                            category => category.id === recipe.category.id
                          )
                          .map(category => ({
                            value: category.id,
                            label: category.name,
                          }))}
                        options={categories
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(category => ({
                            value: category.id,
                            label: category.name,
                          }))}
                        onChange={(value: ValueType<SelectOption>) => {
                          if (value) {
                            input.onChange((value as SelectOption).value)
                          }
                        }}
                      />
                    </FormGroup>
                  )}
                </Field>
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
                <Field name="preparationTime" placeholder="Vorbereitungszeit">
                  {({ input, ...rest }) => (
                    <FormGroup controlId="preparationTime">
                      <FormLabel>Vorbereitungszeit</FormLabel>
                      <Input {...input} {...rest} />
                    </FormGroup>
                  )}
                </Field>
                <Field name="cookingTime" placeholder="Back-/Kochzeit">
                  {({ input, ...rest }) => (
                    <FormGroup controlId="cookingTime">
                      <FormLabel>Back-/Kochzeit</FormLabel>
                      <Input {...input} {...rest} />
                    </FormGroup>
                  )}
                </Field>
                <Field name="restTime" placeholder="Ruhezeit">
                  {({ input, ...rest }) => (
                    <FormGroup controlId="restTime">
                      <FormLabel>Ruhezeit</FormLabel>
                      <Input {...input} {...rest} />
                    </FormGroup>
                  )}
                </Field>
              </Col>
              <Col sm={6}>
                <Field name="ranking" placeholder="Bewertung">
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
                </Field>
                <Field name="difficulty">
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
                          <ToggleButton value={0} variant="outline-secondary">
                            Leicht
                          </ToggleButton>
                          <ToggleButton value={1} variant="outline-secondary">
                            Mittel
                          </ToggleButton>
                          <ToggleButton value={2} variant="outline-secondary">
                            Schwer
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    </FormGroup>
                  )}
                </Field>
                <Field name="servings" placeholder="Anzahl der Portionen">
                  {({ input, ...rest }) => (
                    <FormGroup controlId="servings">
                      <FormLabel>Anzahl der Portionen</FormLabel>
                      <Input {...input} {...rest} />
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <h5>Zutaten:</h5>
                <IngredientsEditor
                  ingredients={ingredients}
                  onAdd={handleIngredientAdd}
                  onDelete={handleIngredientDelete}
                  onChange={handleIngredientChange}
                />
              </Col>
              <Col md={6}>
                <Field name="preparations">
                  {({ input }) => (
                    <FormGroup controlId="preparations">
                      <h5>Zubereitung:</h5>
                      <Editor
                        value={input.value}
                        onChange={value => input.onChange(value)}
                      />
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>

            <Row>
              <Col>
                <Field name="source" placeholder="Quelle">
                  {({ input, ...rest }) => (
                    <FormGroup controlId="source">
                      <FormLabel>Quelle</FormLabel>
                      <Input {...input} {...rest} />
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>
          </Container>
          <hr />
          <Container fluid>
            <ActionBar>
              <Button type="submit" disabled={submitting || pristine}>
                <FontAwesomeIcon icon={['fas', 'save']} /> Speichern
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => history.goBack()}
              >
                <FontAwesomeIcon icon={['fas', 'times']} /> Abbrechen
              </Button>
            </ActionBar>
          </Container>
        </form>
      )}
    </Form>
  )
}

export default RecipeEditForm
