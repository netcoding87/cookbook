import Datastore from 'nedb'
import path from 'path'
import { DB_RECIPES, ROOT } from '../utils/config'



const db = new Datastore({
  filename: `${ROOT}${path.sep}${DB_RECIPES}`,
  autoload: true,
})

export type Ingredient = {
  amount?: string | null
  ingredient: string
  measure: string
}

export type Recipe = {
  _id: string
  title: string
  subtitle?: string
  tags?: string
  ranking: number
  servings?: string
  difficulty: number
  preparationTime?: string
  cookingTime?: string
  restTime?: string
  preparations?: string
  source?: string
  category: string
  ingredients?: Ingredient[]
}

export const add = (
  title: string,
  ranking: number,
  difficulty: number,
  category: string,
  subtitle?: string,
  tags?: string,
  servings?: string,
  preparationTime?: string,
  cookingTime?: string,
  restTime?: string,
  preparations?: string,
  source?: string,
  ingredients?: Ingredient[]
): Promise<Recipe> => {
  return new Promise(resolve => {
    const tmp: Recipe = {
      _id: '',
      title,
      subtitle,
      tags,
      ranking,
      servings,
      difficulty,
      preparationTime,
      cookingTime,
      restTime,
      preparations,
      source,
      category,
      ingredients,
    }

    delete tmp['_id']

    db.insert(tmp, (err, doc) => {
      resolve(doc)
    })
  })
}

export const getAll = (): Promise<Recipe[]> => {
  return new Promise(resolve => {
    db.find({}, (err: any, docs: any) => {
      resolve(docs)
    })
  })
}

export const getById = (id: string): Promise<Recipe | null> => {
  return new Promise(resolve => {
    db.findOne({ _id: id }, (err, doc) => {
      resolve(doc)
    })
  })
}

export const remove = (id: string): Promise<number> => {
  return new Promise(resolve => {
    db.remove({ _id: id }, (err, number) => {
      resolve(number)
    })
  })
}

export const update = (recipe: Recipe): Promise<number> => {
  return new Promise(resolve => {
    db.update({ _id: recipe._id }, recipe, {}, (err, number) => {
      resolve(number)
    })
  })
}
