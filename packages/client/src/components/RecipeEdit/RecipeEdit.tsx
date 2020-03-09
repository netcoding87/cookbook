import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useHistory, useParams } from 'react-router-dom'

import {
  useCreateImageMutation,
  useImageQuery,
  useRecipeEditQuery,
  useUpdateImageMutation,
  useUpdateRecipeMutation,
} from '../../typings/generated.d'
import Breadcrumbs from '../Breadcrumbs'
import Layout from '../Layout'
import RecipeEditForm from '../RecipeEditForm'
import {
  RecipeEditFormIngredientData,
  RecipeEditFormRecipeData,
} from '../RecipeEditForm/RecipeEditForm'

const RecipeEdit: React.FC = () => {
  const history = useHistory()
  const { id, title } = useParams()

  const [image, setImage] = useState('')

  const { data } = useRecipeEditQuery({ variables: { id: id! } })
  const { data: dbImage } = useImageQuery({ variables: { recipe: id! } })

  const [updateRecipeMutation] = useUpdateRecipeMutation()

  const [createImageMutation] = useCreateImageMutation()
  const [updateImageMutation] = useUpdateImageMutation()

  useEffect(() => {
    if (dbImage && dbImage.image) {
      setImage(dbImage.image.image)
    }
  }, [dbImage])

  const handleSubmit = async (
    values: RecipeEditFormRecipeData,
    ingredients: RecipeEditFormIngredientData[],
    image: string | null
  ) => {
    const updateRecipe = updateRecipeMutation({
      variables: {
        id: values.id,
        title: values.title,
        subtitle: values.subtitle,
        tags: values.tags,
        ranking: values.ranking,
        servings: values.servings,
        difficulty: values.difficulty,
        preparationTime: values.preparationTime,
        cookingTime: values.cookingTime,
        restTime: values.restTime,
        preparations: values.preparations,
        source: values.source,
        category: values.category.id,
        ingredients: ingredients.map(ingredient => ({
          amount: ingredient.amount,
          ingredient: ingredient.ingredient,
          measure: ingredient.measure.id,
        })),
      },
    })

    let updateImage = new Promise(resolve => {
      resolve()
    })

    if (image) {
      updateImage = dbImage?.image
        ? updateImageMutation({
            variables: {
              id: dbImage.image!.id,
              image: image,
              recipe: data!.recipe!.id,
            },
          })
        : createImageMutation({
            variables: {
              image: image,
              recipe: data!.recipe!.id,
            },
          })
    }

    await Promise.all([updateRecipe, updateImage])

    // Redirect
    history.push(`/recipe/${id}/${values.title}`)
  }

  if (!data) {
    return <Layout>Loading...</Layout>
  }

  if (data.recipe?.title !== title) {
    // TODO: Return NotFoundPage when implemented
    return <Layout>Invalid!</Layout>
  }

  return (
    <Layout>
      <Container fluid>
        <Breadcrumbs
          items={[
            {
              url: '/',
              title: 'Rezepte',
            },
            {
              url: `/recipe/${id}/${title}`,
              title: title!,
            },
            {
              url: `/recipe/${id}/${title}/edit`,
              title: 'Edit',
            },
          ]}
          showHome={false}
        />
      </Container>
      <RecipeEditForm
        onSubmit={handleSubmit}
        recipe={data.recipe!}
        ingredients={data.recipe?.ingredients}
        image={image}
      />
    </Layout>
  )
}

export default RecipeEdit
