import { getById as getCategoryById } from '../../database/categories'
import { getAll, getById as getRecipeById } from '../../database/recipes'
import { RecipeData } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

export const listRecipes = async (
  root,
  { input },
  ctx: ContextType
): Promise<RecipeData[]> => {
  const recipes = await getAll()
  recipes.map(async recipe => {
    const category = await getCategoryById(
      recipe ? parseInt(recipe.category) : 0
    )
    console.log(`Category for Recipe ${recipe._id}: ${category?.name}`)
  })

  console.log('here')
  return recipes.map(recipe => ({
    id: recipe._id,
    title: recipe.title,
    ranking: 5,
    difficulty: 0,
    category: {
      id: '',
      name: '',
      parent: '',
    },
  }))
}

export const listRecipe = async (
  root,
  params,
  ctx: ContextType
): Promise<RecipeData | null> => {
  const recipe = await getRecipeById(params.id)
  const category = await getCategoryById(recipe ? parseInt(recipe.category) : 0)

  return recipe
    ? {
        id: recipe._id,
        title: recipe.title,
        ranking: 5,
        difficulty: 0,
        category: {
          id: category ? category._id.toString() : '',
          name: category ? category.name : '',
          parent: category ? category.parent.toString() : '',
        },
      }
    : null
}
