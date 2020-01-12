import listCategories from './query/listCategories'
import listMeasures from './query/listMeasures'
import listRecipes from './query/listRecipes'

const resolvers = {
  Query: {
    categories: listCategories,
    category: listCategories,

    measures: listMeasures,
    measure: listMeasures,

    recipes: listRecipes,
    recipe: listRecipes,
  },
}

export default resolvers
