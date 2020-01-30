import { useEffect, useState } from 'react'

import { useTagsQuery } from '../typings/generated.d'

export const useTags = () => {
  const [tags, setTags] = useState<string[]>([])

  const { data } = useTagsQuery()

  useEffect(() => {
    if (data && data.recipes) {
      const tags: string[] = []

      // iterate through recipes and add tags if not exists
      data.recipes.forEach(recipe => {
        recipe.tags &&
          recipe.tags
            .split(',')
            .forEach(tag => !tags.includes(tag.trim()) && tags.push(tag.trim()))
      })

      // sort tags
      tags.sort((a, b) => a.localeCompare(b))

      setTags(tags)
      console.info(tags)
    }
  }, [data])

  return { tags }
}
