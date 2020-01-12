import { addRecipe, getRecipes } from '../../database/recipes'
import { ContextType } from '../../utils/createContext'

const listRecipes: any = (root, { input }, ctx: ContextType) => {
  addRecipe()
  getRecipes(recipes => {
    console.log(recipes)
  })
  return [
    { id: 1, title: 'Recipe One' },
    { id: 2, title: 'Recipe Two' },
  ]
}

export default listRecipes
