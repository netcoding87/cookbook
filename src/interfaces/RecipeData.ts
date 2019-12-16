export interface RecipeData {
  id: number
  title: string
  subtitle?: string
  tags?: string
  ranking: number
  servings?: string
  difficulty: number
  preparationTime?: string
  cookingTime?: string
  restTime?: string
  preparations?: string
  source?: string
  categoryId: string
}
