import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Fragment, useState } from 'react'
import Container from 'react-bootstrap/Container'
import useSWR from 'swr'

import { RecipeData } from '../../interfaces'
import Layout from '../Layout'
import RecipeCard from '../RecipeCard'
import { useStaticData } from '../StaticDataProvider'
import { Box, CategoryTitle, SliderContainer } from './Dashboard.styles'

interface CategoryRecipeMap {
  [id: string]: RecipeData[]
}

const Dashboard: React.FC = () => {
  const [cardWidth, setCardWidth] = useState(200)

  const { data } = useSWR<RecipeData[]>('http://localhost:4000/recipes', url =>
    fetch(url).then(response => response.json())
  )

  const { categories } = useStaticData()

  if (!data) {
    return <div>Loading...</div>
  }

  const dict: CategoryRecipeMap = {}

  data.forEach(recipe => {
    const catId = recipe.categoryId

    if (dict[catId]) {
      const recipes = dict[catId]
      recipes.push(recipe)
    } else {
      dict[catId] = [recipe]
    }
  })

  return (
    <Layout>
      <Container fluid>
        {Object.keys(dict).map(key => {
          const recipes = dict[key]
          const category = categories.find(
            category => category.id.toString() === key.toLowerCase()
          )

          return (
            <Fragment key={key}>
              <CategoryTitle>{category && category.name}</CategoryTitle>
              <Box>
                {recipes.map(recipe => {
                  return (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      cardWidth={cardWidth}
                    />
                  )
                })}
              </Box>
            </Fragment>
          )
        })}
      </Container>
      <SliderContainer>
        <Slider
          step={1}
          defaultValue={cardWidth}
          min={100}
          max={500}
          onChange={value => {
            setCardWidth(value)
          }}
        />
      </SliderContainer>
    </Layout>
  )
}

export default Dashboard
