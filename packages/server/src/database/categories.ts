import Datastore from 'nedb'
import path from 'path'

import { DB_CATEGORIES, ROOT } from '../utils/config'

const db = new Datastore({
  filename: `${ROOT}${path.sep}${DB_CATEGORIES}`,
  autoload: true,
})

export interface Category {
  _id: string
  name: string
  parent: string
}

export const getAll = (): Promise<Category[]> => {
  return new Promise(resolve => {
    db.find({}, (err, docs) => {
      resolve(docs)
    })
  })
}

export const getById = (id: string): Promise<Category | null> => {
  return new Promise(resolve => {
    db.findOne({ _id: id }, (err, doc) => {
      resolve(doc)
    })
  })
}
