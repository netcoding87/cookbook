import React from 'react'

import { render } from '../../../tests/testUtils'
import RecipeEditForm, { RecipeEditFormRecipeData } from './RecipeEditForm'

describe('<RecipeEditForm />', () => {
  it('should render...', async () => {
    // Arrange
    const handleSubmit = jest.fn()
    const recipe: RecipeEditFormRecipeData = {
      id: '1',
      title: 'Nudeln mit Tomatensauce',
      subtitle: '',
      tags: 'Nudeln',
      ranking: 2,
      servings: '4',
      difficulty: 0,
      preparationTime: '',
      cookingTime: '',
      restTime: '',
      preparations:
        'Nudeln im Wasser 10 min. kochen lassen. Tomatensauce drüber, fertig :)',
      source: 'Mamas gute Küche',
      category: {
        id: '1',
      },
    }

    // Act
    render(<RecipeEditForm recipe={recipe} onSubmit={handleSubmit} />)

    // Assert
  })
})
