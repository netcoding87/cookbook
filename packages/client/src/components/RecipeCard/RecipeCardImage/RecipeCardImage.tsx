import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { useImageQuery } from '../../../typings/generated.d'
import { Image } from './RecipeCardImage.styles'

interface RecipeCardImageProps {
  id: string
  title: string
}

const RecipeCardImage: React.FC<RecipeCardImageProps> = ({ id, title }) => {
  const { data } = useImageQuery({ variables: { id } })

  return data?.image ? (
    <Image src={data.image.image} alt={title} title={title} />
  ) : (
    <FontAwesomeIcon icon={['fas', 'image']} color="#6c757d" size="5x" />
  )
}

export default RecipeCardImage
