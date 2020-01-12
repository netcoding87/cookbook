import Datastore from 'nedb'
import path from 'path'
import { DB_CATEGORIES, ROOT } from '../utils/config'


const db = new Datastore({
  filename: `${ROOT}${path.sep}${DB_CATEGORIES}`,
  autoload: true,
})

export interface Category {
  _id: number
  name: string
  parent: number
}

export const getAll = (): Promise<Category[]> => {
  return new Promise(resolve => {
    db.find({}, (err, docs) => {
      resolve(docs)
    })
  })
}

export const getById = (id: number): Promise<Category | null> => {
  return new Promise(resolve => {
    db.findOne({ __id: id }, (err, doc) => {
      resolve(doc)
    })
  })
}
