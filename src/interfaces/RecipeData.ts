export interface RecipeData {
  id: number
  title: string
  subtitle?: string
  tags?: string
  keywords?: string
  ranking: number
  servings?: string
  difficulty: number
  preparationTime?: string
  cookingTime?: string
  restTime?: string
  preparations?: string
  categoryId: string
  source?: string
  isPublic?: boolean
}
