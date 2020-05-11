import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Fragment, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom'

import {
  CategoryData,
  RecipeData,
  useRecipesQuery,
} from '../../typings/generated.d'
import Breadcrumbs from '../Breadcrumbs'
import Layout from '../Layout'
import RecipeCard from '../RecipeCard'
import { useStaticData } from '../StaticDataProvider'
import {
  Box,
  CategoryTitle,
  SliderContainer,
  SliderIcon,
} from './Dashboard.styles'

type DashboardRecipeData = Pick<RecipeData, 'id' | 'title'> & {
  category: Pick<CategoryData, 'id' | 'name'>
}

interface CategoryRecipeMap {
  [id: string]: DashboardRecipeData[]
}

const Dashboard: React.FC = () => {
  const { searchTerm } = useParams()

  const [cardWidth, setCardWidth] = useState(200)

  const { data } = useRecipesQuery({
    variables: {
      filter: searchTerm,
    },
  })

  const { categories } = useStaticData()

  if (!data) {
    return <Layout>Loading...</Layout>
  }

  const dict: CategoryRecipeMap = {}

  data.recipes.forEach((recipe) => {
    const catId = recipe.category.id

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
        <Breadcrumbs
          items={[
            {
              url: '/',
              title: 'Rezepte',
            },
          ]}
          showHome={false}
        />
        {Object.keys(dict).map((key) => {
          const recipes = dict[key]
          const category = categories.find(
            (category) => category.id.toString() === key.toLowerCase()
          )

          return (
            <Fragment key={key}>
              <CategoryTitle>{category && category.name}</CategoryTitle>
              <Box>
                {recipes
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((recipe) => {
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
        <SliderIcon>
          <FontAwesomeIcon icon={['fas', 'search-plus']} flip="horizontal" />
        </SliderIcon>
        <Slider
          step={5}
          defaultValue={cardWidth}
          min={100}
          max={500}
          marks={{ 200: '' }}
          onChange={(value) => {
            setCardWidth(value)
          }}
        />
      </SliderContainer>
    </Layout>
  )
}

export default Dashboard
