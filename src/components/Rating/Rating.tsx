import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import * as ReactRating from 'react-rating'

interface RatingProps {
  rating: number
  readonly?: boolean
  onChange?: (value: number) => void
}

const Rating: React.FC<RatingProps> = ({
  rating,
  readonly = false,
  onChange,
}) => {
  return (
    <ReactRating.default
      readonly={readonly}
      initialRating={rating}
      onChange={(value: number) => onChange && onChange(value)}
      emptySymbol={<FontAwesomeIcon icon={['fas', 'star']} color="lightgray" />}
      fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} color="orange" />}
    />
  )
}

export default Rating
