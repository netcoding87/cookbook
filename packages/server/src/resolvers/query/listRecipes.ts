import { ContextType } from '../../utils/createContext'

const listRecipes: any = (root, { input }, ctx: ContextType) => {
  console.log(ctx.dbConnection.query())
  return [
    { id: 1, title: 'Recipe One' },
    { id: 2, title: 'Recipe Two' },
  ]
}

export default listRecipes
