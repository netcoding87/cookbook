import React from 'react'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'

import {
  useCreateImageMutation,
  useCreateRecipeMutation,
} from '../../typings/generated.d'
import Breadcrumbs from '../Breadcrumbs'
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
        ingredients: ingredients.map(ingredient => ({
          amount: ingredient.amount,
          ingredient: ingredient.ingredient,
          measure: ingredient.measure.id,
        })),
      },
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
      <Container fluid>
        <Breadcrumbs
          items={[
            {
              url: '/',
              title: 'Rezepte',
            },
            {
              url: `/new`,
              title: 'Neu',
            },
          ]}
          showHome={false}
        />
      </Container>
      <RecipeEditForm onSubmit={handleSubmit} recipe={recipe} />
    </Layout>
  )
}

export default RecipeNew
