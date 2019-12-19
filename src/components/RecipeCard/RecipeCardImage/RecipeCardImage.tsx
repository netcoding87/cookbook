import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { useImage } from '../../../hooks'
import { Image } from './RecipeCardImage.styles'

interface RecipeCardImageProps {
  id: string
  title: string
}

const RecipeCardImage: React.FC<RecipeCardImageProps> = ({ id, title }) => {
  const { image } = useImage(id)

  return image ? (
    <Image src={image.image} alt={title} title={title} />
  ) : (
    <FontAwesomeIcon icon={['fas', 'image']} color="#6c757d" size="5x" />
  )
}

export default RecipeCardImage
