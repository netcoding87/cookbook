import React from 'react'
import { useHistory } from 'react-router-dom'

import {
  useCreateImageMutation,
  useCreateIngredientMutation,
  useCreateRecipeMutation,
} from '../../typings/generated.d'
import Layout from '../Layout'
import RecipeEditForm from '../RecipeEditForm'
import {
  RecipeEditFormIngredientData,
  RecipeEditFormRecipeData,
} from '../RecipeEditForm/RecipeEditForm'

const RecipeNew: React.FC = () => {
  const recipe: RecipeEditFormRecipeData = {
    id: '',
    title: '',
    difficulty: 0,
    ranking: 3,
    category: { id: '2' },
  }

  const history = useHistory()

  const [createRecipeMutation] = useCreateRecipeMutation()
  const [createIngredientMutation] = useCreateIngredientMutation()
  const [createImageMutation] = useCreateImageMutation()

  const handleSubmit = async (
    recipe: RecipeEditFormRecipeData,
    ingredients: RecipeEditFormIngredientData[],
    image: string | null
  ) => {
    // Create recipe
    const { data } = await createRecipeMutation({
      variables: {
        title: recipe.title,
        subtitle: recipe.subtitle,
        tags: recipe.tags,
        ranking: recipe.ranking,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        preparationTime: recipe.preparationTime,
        cookingTime: recipe.cookingTime,
        restTime: recipe.restTime,
        preparations: recipe.preparations,
        source: recipe.source,
        category: recipe.category.id,
      },
    })

    // Create ingredients
    ingredients.forEach(async ingredient => {
      await createIngredientMutation({
        variables: {
          amount: ingredient.amount,
          ingredient: ingredient.ingredient,
          measure: ingredient.measure.id,
          recipe: data!.createRecipe!.data!.id!,
        },
      })
    })

    if (image) {
      // Create image
      await createImageMutation({
        variables: {
          image: image,
          recipe: data!.createRecipe!.data!.id!,
        },
      })
    }

    history.push(`/recipe/${data!.createRecipe!.data!.id!}/${recipe.title}`)
  }

  return (
    <Layout>
      <RecipeEditForm onSubmit={handleSubmit} recipe={recipe} />
    </Layout>
  )
}

export default RecipeNew
