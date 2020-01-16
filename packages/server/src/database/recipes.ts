import Datastore from 'nedb'
import path from 'path'
import { DB_RECIPES, ROOT } from '../utils/config'


const db = new Datastore({
  filename: `${ROOT}${path.sep}${DB_RECIPES}`,
  autoload: true,
})

export interface Recipe {
  _id: string
  title: string
  category: string
}

export const add = (title: string, category: string): Promise<Recipe> => {
  return new Promise(resolve => {
    const tmp: Recipe = {
      _id: '',
      title,
      category,
    }

    delete tmp['_id']

    db.insert(tmp, (err, doc) => {
      resolve(doc)
    })
  })
}

export const getAll = (): Promise<Recipe[]> => {
  return new Promise(resolve => {
    db.find({}, (err, docs) => {
      resolve(docs)
    })
  })
}

export const getById = (id: number): Promise<Recipe | null> => {
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
