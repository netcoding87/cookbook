import listRecipes from './query/listRecipes'

const resolvers = {
  Query: {
    recipes: listRecipes,
  },
}

export default resolvers
