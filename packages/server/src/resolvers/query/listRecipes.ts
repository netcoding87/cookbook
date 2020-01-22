import { getById as getCategoryById } from '../../database/categories'
import { getAll, getById as getRecipeById } from '../../database/recipes'
import { RecipeData } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

export const listRecipes = async (
  root,
  { input },
  ctx: ContextType,
  info
): Promise<RecipeData[]> => {
  const recipes = await getAll()

  return await Promise.all(
    recipes.map(async recipe => {
      const category = await getCategoryById(recipe.category)

      return {
        id: recipe._id,
        title: recipe.title,
        ranking: 5,
        difficulty: 0,
        category: {
          id: category ? category._id : '',
          name: category ? category.name : '',
          parent: category ? category.parent : '',
        },
        ingredients: [
          {
            id: '123',
            amount: '200',
            measure: {
              id: '1',
              name: 'g',
            },
            ingredient: 'Zucker',
          },
        ],
      }
    })
  )
}

export const listRecipe = async (
  root,
  params,
  ctx: ContextType
): Promise<RecipeData | null> => {
  const recipe = await getRecipeById(params.id)
  const category = await getCategoryById(recipe ? recipe.category : '')

  return recipe
    ? {
        id: recipe._id,
        title: recipe.title,
        ranking: 5,
        difficulty: 0,
        category: {
          id: category ? category._id : '',
          name: category ? category.name : '',
          parent: category ? category.parent : '',
        },
        ingredients: [
          {
            id: '123',
            amount: '200',
            measure: {
              id: '1',
              name: 'g',
            },
            ingredient: 'Zucker',
          },
        ],
      }
    : null
}
