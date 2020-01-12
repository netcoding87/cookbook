import Datastore from 'nedb'
import path from 'path'
import { DB_RECIPES, ROOT } from '../utils/config'


const db = new Datastore({
  filename: `${ROOT}${path.sep}${DB_RECIPES}`,
  autoload: true,
})

export const addRecipe = () => {
  const doc = {
    hello: 'world',
    n: 5,
    today: new Date(),
    nedbIsAwesome: true,
    notthere: null,
    notToBeSaved: undefined, // Will not be saved
    fruits: ['apple', 'orange', 'pear'],
    infos: { name: 'nedb' },
  }

  db.insert(doc)
}

export const deleteRecipe = (id: string) => {
  db.remove({ id: id }, {}, (err, number) => {
    console.log(`Removed ${number} entries from database`)
  })
}

export const getRecipes = fnc => {
  // Get all recipes from the database
  db.find({}, function(err, docs) {
    // Execute the parameter function
    fnc(docs)
  })
}

export const getRecipeById = (id: string, callback: (doc: any) => void) => {
  db.findOne({ _id: id }, (err, doc) => {
    callback(doc)
  })
}
