import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useSWR from 'swr'

import { useImage } from '../../hooks'
import { IngredientData, RecipeData } from '../../interfaces'
import Layout from '../Layout'
import RecipeEditForm from '../RecipeEditForm'

const RecipeEdit: React.FC = () => {
  const history = useHistory()
  const { id } = useParams()

  const [image, setImage] = useState('')

  const { data: recipe } = useSWR<RecipeData>(
    `http://localhost:4000/recipes/${id}`,
    url => fetch(url).then(response => response.json())
  )

  const { data: dbIngredients } = useSWR<IngredientData[]>(
    `http://localhost:4000/recipes/${id}/ingredients`,
    url => fetch(url).then(response => response.json())
  )

  const { loading: imageLoading, image: dbImage } = useImage(id!)

  useEffect(() => {
    if (dbImage) {
      setImage(dbImage.image)
    }
  }, [dbImage])

  const handleSubmit = async (
    values: RecipeData,
    ingredients: IngredientData[],
    image: string | null
  ) => {
    // Update recipe data
    await fetch(`http://localhost:4000/recipes/${values.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    // Delete all related ingredients
    const ids = dbIngredients ? dbIngredients.map(item => item.id) : []
    const deleteAll = ids.map(id =>
      fetch(`http://localhost:4000/ingredients/${id}`, { method: 'DELETE' })
    )

    await Promise.all(deleteAll)

    // Create new ingredients
    const promises = ingredients.map(ingredient => {
      delete ingredient['id']
      return fetch(`http://localhost:4000/ingredients`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredient),
      })
    })

    await Promise.all(promises)

    // Update / upload image
    if (image) {
      let imageUploadURL = `http://localhost:4000/images`
      let imageUploadMethod = `POST`

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
      })
    }

    // Redirect
    history.push(`/recipe/${id}`)
  }

  console.log(`ImageLoading: ${imageLoading}`)

  if (!recipe || !dbIngredients) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <RecipeEditForm
        onSubmit={handleSubmit}
        recipe={recipe}
        ingredients={dbIngredients}
        image={image}
      />
    </Layout>
  )
}

export default RecipeEdit
