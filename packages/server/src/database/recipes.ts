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

export const remove = (id: string) => {
  db.remove({ id: id }, {}, (err, number) => {
    console.log(`Removed ${number} entries from database`)
  })
}

export const getAll = fnc => {
  // Get all recipes from the database
  db.find({}, function(err, docs) {
    // Execute the parameter function
    fnc(docs)
  })
}

export const getById = (id: number): Promise<Recipe | null> => {
  return new Promise(resolve => {
    db.findOne({ _id: id }, (err, doc) => {
      resolve(doc)
    })
  })
}
