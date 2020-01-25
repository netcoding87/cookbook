import React from 'react'
import { useHistory } from 'react-router-dom'
import { IngredientData, RecipeData } from '../../interfaces'
import { useCreateImageMutation, useCreateIngredientMutation, useCreateRecipeMutation } from '../../typings/generated.d'
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

  const [createRecipeMutation] = useCreateRecipeMutation()
  const [createIngredientMutation] = useCreateIngredientMutation()
  const [createImageMutation] = useCreateImageMutation()

  const handleSubmit = async (
    recipe: RecipeData,
    ingredients: IngredientData[],
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
        category: recipe.categoryId,
      },
    })

    // Create ingredients
    ingredients.forEach(async ingredient => {
      await createIngredientMutation({
        variables: {
          amount: ingredient.amount,
          ingredient: ingredient.ingredient,
          measure: ingredient.measureId,
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
