import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import * as ReactRating from 'react-rating'

interface RatingProps {
  rating: number
  readonly?: boolean
  size?: 'default' | 'xs'
  onChange?: (value: number) => void
}

const Rating: React.FC<RatingProps> = ({
  rating,
  readonly = false,
  size = 'default',
  onChange,
}) => {
  const iconSize = size === 'default' ? '1x' : 'xs'

  return (
    <ReactRating.default
      readonly={readonly}
      initialRating={rating}
      onChange={(value: number) => onChange && onChange(value)}
      emptySymbol={
        <FontAwesomeIcon
          icon={['fas', 'star']}
          color="lightgray"
          size={iconSize}
          data-testid="emptyStar"
        />
      }
      fullSymbol={
        <FontAwesomeIcon
          icon={['fas', 'star']}
          color="orange"
          size={iconSize}
          data-testid="fullStar"
        />
      }
    />
  )
}

export default Rating
