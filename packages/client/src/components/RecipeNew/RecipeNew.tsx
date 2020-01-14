import React from 'react'
import { useHistory } from 'react-router-dom'
import { IngredientData, RecipeData } from '../../interfaces'
import Layout from '../Layout'
import RecipeEditForm from '../RecipeEditForm'


const RecipeNew: React.FC = () => {
  const recipe: RecipeData = {
    id: -1,
    title: '',
    categoryId: '2',
    difficulty: 0,
    ranking: 3,
  }

  const history = useHistory()

  const handleSubmit = async (
    recipe: RecipeData,
    ingredients: IngredientData[],
    image: string | null
  ) => {
    // Remove id from recipe
    delete recipe['id']

    // Add recipe data
    const response = await fetch(`http://localhost:4000/recipes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })

    if (response.ok) {
      const result = await response.json()
      const recipeId = result.id

      // Create new ingredients
      const promises = ingredients.map(ingredient => {
        delete ingredient['id']
        ingredient.recipeId = recipeId

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

      // Upload image
      if (image) {
        await fetch('http://localhost:4000/images', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: image, recipeId: recipeId }),
        })
      }

      history.push(`/recipe/${recipeId}`)
      console.log(`${recipeId}`)
    }

    if (!response.ok) {
      console.log('An error occurred!')
    }
  }

  return (
    <Layout>
      <RecipeEditForm onSubmit={handleSubmit} recipe={recipe} />
    </Layout>
  )
}

export default RecipeNew
