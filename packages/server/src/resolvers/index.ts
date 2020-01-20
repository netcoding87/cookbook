import createImage from './mutation/createImage'
import createIngredient from './mutation/createIngredient'
import createRecipe from './mutation/createRecipe'
import removeImage from './mutation/removeImage'
import removeIngredient from './mutation/removeIngredient'
import removeRecipe from './mutation/removeRecipe'
import updateImage from './mutation/updateImage'
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
  },
}

export default resolvers
