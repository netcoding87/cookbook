import React from 'react'

import { RecipeData } from '../../interfaces'

interface RecipeCardProps {
  recipe: RecipeData
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  console.log(recipe)
  return <div>RecipeCard</div>
}

export default RecipeCard
