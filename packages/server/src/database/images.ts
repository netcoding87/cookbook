import Datastore from 'nedb'
import path from 'path'

import { DB_IMAGES, ROOT } from '../utils/config'

const db = new Datastore({
  filename: `${ROOT}${path.sep}${DB_IMAGES}`,
  autoload: true,
})

export interface Image {
  _id: string
  image: string
  recipe: string
}

export const add = (image: string, recipe: string): Promise<Image> => {
  return new Promise(resolve => {
    const tmp: Image = {
      _id: '',
      image: image,
      recipe: recipe,
    }

    delete tmp['_id']

    db.insert(tmp, (err, doc) => {
      resolve(doc)
    })
  })
}

export const getForRecipe = (recipeId: string): Promise<Image | null> => {
  return new Promise(resolve => {
    db.findOne({ recipe: recipeId }, (err, doc) => {
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

export const update = (image: Image): Promise<number> => {
  return new Promise(resolve => {
    db.update({ _id: image._id }, image, {}, (err, number) => {
      resolve(number)
    })
  })
}
