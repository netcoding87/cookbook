import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Image from 'react-bootstrap/Image'

import { useImage } from '../../hooks'

interface RecipeImageProps {
  id: string
  title: string
  fluid?: boolean
  height?: string
}

const RecipeImage: React.FC<RecipeImageProps> = ({
  id,
  title,
  fluid = false,
  height = '',
}) => {
  const { image } = useImage(id)

  if (height && fluid) {
    console.warn(
      'You passed `height` and `fluid` in combination. This is not intended. `fluid` prop will be ignored when passing a `height`!'
    )
  }

  return image ? (
    <Image
      src={image.image}
      alt={title}
      title={title}
      rounded
      height={height}
      fluid={!height && fluid}
    />
  ) : (
    <FontAwesomeIcon icon={['fas', 'image']} color="#6c757d" size="10x" />
  )
}

export default RecipeImage
