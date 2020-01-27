import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import {
  useCreateImageMutation,
  useCreateIngredientMutation,
  useImageQuery,
  useRecipeEditQuery,
  useRemoveIngredientMutation,
  useUpdateImageMutation,
  useUpdateRecipeMutation,
} from '../../typings/generated.d'
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

  const [createIngredientMutation] = useCreateIngredientMutation()
  const [removeIngredientMutation] = useRemoveIngredientMutation()

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
      },
    })

    // Delete all related ingredients
    const ids = data?.recipe?.ingredients
      ? data?.recipe.ingredients.map(item => item.id)
      : []
    const deleteIngredients = ids.map(id =>
      // fetch(`http://localhost:4000/ingredients/${id}`, { method: 'DELETE' })
      removeIngredientMutation({
        variables: {
          id: id,
        },
      })
    )

    // Create new ingredients
    const createIngredients = ingredients.reverse().map(ingredient => {
      createIngredientMutation({
        variables: {
          amount: ingredient.amount,
          ingredient: ingredient.ingredient,
          measure: ingredient.measure.id,
          recipe: data!.recipe!.id!,
        },
      })
    })

    let updateImage = new Promise(() => {})

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

    await Promise.all([
      updateRecipe,
      deleteIngredients,
      createIngredients,
      updateImage,
    ])

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
