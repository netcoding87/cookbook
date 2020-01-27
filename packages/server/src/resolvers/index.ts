import { getById as getCategoryById } from '../database/categories'
import { getForRecipe } from '../database/ingredients'
import { getById as getMeasureById } from '../database/measures'
import { CategoryData, MeasureData } from '../typings/generated'
import { PlainIngredientData, PlainRecipeData } from '../typings/plaintypes'
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
import { listRecipe, listRecipes } from './query/listRecipes'

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
    category: async (root: PlainRecipeData): Promise<CategoryData> => {
      const category = await getCategoryById(root.category)
      return {
        id: category ? category._id : '',
        name: category ? category.name : '',
        parent: category ? category.parent : '',
      }
    },
    ingredients: async (
      root: PlainRecipeData
    ): Promise<PlainIngredientData[]> => {
      const ingredients = await getForRecipe(root.id)
      return ingredients.map(ingredient => {
        return {
          id: ingredient._id,
          amount: ingredient.amount,
          ingredient: ingredient.ingredient,
          measure: ingredient.measure,
        }
      })
    },
  },

  IngredientData: {
    measure: async (root: PlainIngredientData): Promise<MeasureData> => {
      const measure = await getMeasureById(root.measure)
      return {
        id: measure ? measure._id : '',
        name: measure ? measure.name : '',
      }
    },
  },
}

export default resolvers
