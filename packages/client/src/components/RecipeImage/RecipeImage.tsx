import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { useImageQuery } from '../../typings/generated.d'
import { Image } from './RecipeImage.styles'

interface RecipeImageProps {
  id: string
  title: string
  size?: 'large' | 'small'
}

const RecipeImage: React.FC<RecipeImageProps> = ({
  id,
  title,
  size = 'large',
}) => {
  const { data } = useImageQuery({ variables: { recipe: id } })

  return data?.image ? (
    <Image src={data.image.image} alt={title} title={title} />
  ) : (
    <FontAwesomeIcon
      icon={['fas', 'image']}
      color="#6c757d"
      size={size === 'large' ? '10x' : '5x'}
    />
  )
}

export default RecipeImage
