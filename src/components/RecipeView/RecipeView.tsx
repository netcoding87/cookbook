import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Rating from 'react-rating'
import { useParams } from 'react-router'
import useSWR from 'swr'

import { ImageData, RecipeData } from '../../interfaces'
import Layout from '../Layout'

const RecipeView: React.FC = () => {
  const { id } = useParams()
  const { data } = useSWR<RecipeData>(
    `http://localhost:4000/recipes/${id}`,
    url => fetch(url).then(response => response.json())
  )

  const { data: imageData } = useSWR<ImageData[]>(
    `http://localhost:4000/images?recipeId=${id}`,
    url => fetch(url).then(response => response.json())
  )

  if (!data) {
    return <div>Loading...</div>
  }

  if (!imageData) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <h1>{data.title}</h1>
      {data.subtitle && <div>{data.subtitle}</div>}
      <div>
        <Rating
          readonly
          initialRating={data.ranking}
          emptySymbol={<FontAwesomeIcon icon={['far', 'star']} />}
          fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} color="orange" />}
        />{' '}
        | Schwierigkeit: Mittel
      </div>
      <hr />
      <img src={imageData[0].image} height="240" alt={data.title} />
    </Layout>
  )
}

export default RecipeView
