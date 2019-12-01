export interface RecipeData {
  id: number
  title: string
  subtitle?: string
  keywords?: string
  servcings: string
  difficulty: number
  source?: string
  preparationTime?: string
  cookingTime: string
  restTime: string
  ranking: number
  isPublic: boolean
  tags: string
}