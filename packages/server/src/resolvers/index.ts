import createImage from './mutation/createImage'
import createRecipe from './mutation/createRecipe'
import removeImage from './mutation/removeImage'
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
  },
}

export default resolvers
