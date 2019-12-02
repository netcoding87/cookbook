import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import * as ReactRating from 'react-rating'

interface RatingProps {
  rating: number
  readonly?: boolean
}

const Rating: React.FC<RatingProps> = ({ rating, readonly = false }) => {
  return (
    <ReactRating.default
      readonly={readonly}
      initialRating={rating}
      emptySymbol={<FontAwesomeIcon icon={['fas', 'star']} color="lightgray" />}
      fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} color="orange" />}
    />
  )
}

export default Rating
