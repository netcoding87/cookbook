import Datastore from 'nedb'
import path from 'path'
import { DB_INGREDIENTS, ROOT } from '../utils/config'


const db = new Datastore({
  filename: `${ROOT}${path.sep}${DB_INGREDIENTS}`,
  autoload: true,
})

export interface Ingredient {
  _id: string
  amount: string
  ingredient: string
  measure: string
}

export const add = (
  amount: string,
  ingredient: string,
  measure: string
): Promise<Ingredient> => {
  return new Promise(resolve => {
    const tmp: Ingredient = {
      _id: '',
      amount: amount,
      ingredient: ingredient,
      measure: measure,
    }

    delete tmp['_id']

    db.insert(tmp, (err, doc) => {
      resolve(doc)
    })
  })
}
