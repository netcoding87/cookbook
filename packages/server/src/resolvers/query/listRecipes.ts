import { getById as getCategoryById } from '../../database/categories'
import { getById as getRecipeById } from '../../database/recipes'
import { RecipeData } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

export const listRecipes: any = (root, { input }, ctx: ContextType) => {
  return [
    { id: 1, title: 'Recipe One' },
    { id: 2, title: 'Recipe Two' },
  ]
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
