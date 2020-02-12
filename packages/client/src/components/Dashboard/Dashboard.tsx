import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Fragment, useState } from 'react'
import Container from 'react-bootstrap/Container'

import {
  CategoryData,
  RecipeData,
  useRecipesQuery,
} from '../../typings/generated.d'
import Layout from '../Layout'
import RecipeCard from '../RecipeCard'
import { useStaticData } from '../StaticDataProvider'
import { Box, CategoryTitle, SliderContainer } from './Dashboard.styles'

type DashboardRecipeData = Pick<RecipeData, 'id' | 'title'> & {
  category: Pick<CategoryData, 'id' | 'name'>
}

interface CategoryRecipeMap {
  [id: string]: DashboardRecipeData[]
}

const Dashboard: React.FC = () => {
  const [cardWidth, setCardWidth] = useState(200)

  const { data } = useRecipesQuery()

  const { categories } = useStaticData()

  if (!data) {
    return <Layout>Loading...</Layout>
  }

  const dict: CategoryRecipeMap = {}

  data.recipes.forEach(recipe => {
    const catId = recipe.category.id

    if (dict[catId]) {
      const recipes = dict[catId]
      recipes.push(recipe)
    } else {
      dict[catId] = [recipe]
    }
  })

  return (
    <Layout footer>
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
                {recipes
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map(recipe => {
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
