import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { ImageData } from '../interfaces'

export function useImage(recipeId: string | number) {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<ImageData>()

  const { data } = useSWR<ImageData[]>(
    `http://localhost:4000/images?recipeId=${recipeId}`,
    url => fetch(url).then(response => response.json())
  )

  useEffect(() => {
    console.log(`inside here`)
    setLoading(true)
    data && data.length > 0 && setImage(data[0])
    setLoading(false)
  }, [data])

  return { loading, image }
}
