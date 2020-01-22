import { getById } from '../database/categories'
import { getForRecipe } from '../database/ingredients'
import { CategoryData, IngredientData } from '../typings/generated'
import createImage from './mutation/createImage'
import createIngredient from './mutation/createIngredient'
import createRecipe from './mutation/createRecipe'
import removeImage from './mutation/removeImage'
import removeIngredient from './mutation/removeIngredient'
import removeRecipe from './mutation/removeRecipe'
import updateImage from './mutation/updateImage'
import updateIngredient from './mutation/updateIngredient'
import updateRecipe from './mutation/updateRecipe'
import listCategories from './query/listCategories'
import listImage from './query/listImage'
import listMeasures from './query/listMeasures'
import { listRecipe, listRecipes, RecipeDataWithoutNestedData } from './query/listRecipes'

const resolvers = {
  Query: {
    categories: listCategories,
    image: listImage,
    measures: listMeasures,
    recipes: listRecipes,
    recipe: listRecipe,
  },

  Mutation: {
    createImage: createImage,
    removeImage: removeImage,
    updateImage: updateImage,

    createRecipe: createRecipe,
    removeRecipe: removeRecipe,
    updateRecipe: updateRecipe,

    createIngredient: createIngredient,
    removeIngredient: removeIngredient,
    updateIngredient: updateIngredient,
  },

  RecipeData: {
    category: async (
      root: RecipeDataWithoutNestedData
    ): Promise<CategoryData> => {
      const category = await getById(root.category)
      return {
        id: category ? category._id : '',
        name: category ? category.name : '',
        parent: category ? category.parent : '',
      }
    },
    ingredients: async (
      root: RecipeDataWithoutNestedData
    ): Promise<IngredientData[]> => {
      const ingredients = await getForRecipe(root.id)
      return ingredients.map(ingredient => {
        return {
          id: ingredient._id,
          amount: ingredient.amount,
          ingredient: ingredient.ingredient,
          measure: {
            id: '2',
            name: 'Test',
          },
        }
      })
    },
  },
}

export default resolvers
