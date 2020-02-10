import fs from 'fs'
import path from 'path'

const userdir =
  process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
const dir = `${userdir}${path.sep}.cookbook`

if (process.env.NODE_ENV !== 'development') {
  !fs.existsSync(dir) && fs.mkdirSync(dir)
}

export const ROOT =
  process.env.NODE_ENV === 'development'
    ? `.${path.sep}src${path.sep}database`
    : `${dir}`

export const DB_CATEGORIES = 'categories.db'
export const DB_IMAGES = 'images.db'
export const DB_INGREDIENTS = 'ingredients.db'
export const DB_MEASURES = 'measures.db'
export const DB_RECIPES = 'recipes.db'
