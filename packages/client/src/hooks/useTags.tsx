import { useEffect, useState } from 'react'

import { RecipeData } from '../interfaces'

const api = <T extends {}>(url: string): Promise<T> => {
  return fetch(url).then(response => response.json() as Promise<T>)
}

export const useTags = () => {
  const [tags, setTags] = useState<string[]>([])

  const fetchRecipes = async () => {
    try {
      const response = await api<RecipeData[]>('http://localhost:4000/recipes')
      if (response) {
        const tags: string[] = []

        // iterate through recipes and add tags if not exists
        response.forEach(recipe => {
          recipe.tags &&
            recipe.tags
              .split(';')
              .forEach(tag => !tags.includes(tag) && tags.push(tag))
        })

        // sort tags
        tags.sort((a, b) => a.localeCompare(b))

        setTags(tags)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return { tags }
}
