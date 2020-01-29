/**
 * auto generated by graphql-codegen
 * DO NOT EDIT THIS FILE BY HAND
 */

import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CategoryData = {
  __typename?: 'CategoryData'
  id: Scalars['ID']
  name: Scalars['String']
  parent: Scalars['ID']
}

export type CreateImageInput = {
  image: Scalars['String']
  recipe: Scalars['ID']
}

export type CreateImagePayload = {
  __typename?: 'CreateImagePayload'
  data: ImageData
}

export type CreateRecipeInput = {
  title: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  tags?: Maybe<Scalars['String']>
  ranking: Scalars['Int']
  servings?: Maybe<Scalars['String']>
  difficulty: Scalars['Int']
  preparationTime?: Maybe<Scalars['String']>
  cookingTime?: Maybe<Scalars['String']>
  restTime?: Maybe<Scalars['String']>
  preparations?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  category: Scalars['ID']
  ingredients: Array<IngredientDataInput>
}

export type CreateRecipePayload = {
  __typename?: 'CreateRecipePayload'
  data: RecipeData
}

export type ImageData = {
  __typename?: 'ImageData'
  id: Scalars['ID']
  image: Scalars['String']
  recipe: Scalars['ID']
}

export type IngredientData = {
  __typename?: 'IngredientData'
  amount?: Maybe<Scalars['String']>
  ingredient: Scalars['String']
  measure: MeasureData
}

export type IngredientDataInput = {
  amount?: Maybe<Scalars['String']>
  ingredient: Scalars['String']
  measure: Scalars['ID']
}

export type MeasureData = {
  __typename?: 'MeasureData'
  id: Scalars['ID']
  name: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createImage: CreateImagePayload
  removeImage: RemoveImagePayload
  updateImage: UpdateImagePayload
  createRecipe: CreateRecipePayload
  removeRecipe: RemoveRecipePayload
  updateRecipe: UpdateRecipePayload
}

export type MutationCreateImageArgs = {
  input: CreateImageInput
}

export type MutationRemoveImageArgs = {
  input: RemoveImageInput
}

export type MutationUpdateImageArgs = {
  input: UpdateImageInput
}

export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput
}

export type MutationRemoveRecipeArgs = {
  input: RemoveRecipeInput
}

export type MutationUpdateRecipeArgs = {
  input: UpdateRecipeInput
}

export type Query = {
  __typename?: 'Query'
  categories: Array<CategoryData>
  image?: Maybe<ImageData>
  measures: Array<MeasureData>
  recipes: Array<RecipeData>
  recipe?: Maybe<RecipeData>
}

export type QueryImageArgs = {
  recipeId: Scalars['ID']
}

export type QueryRecipeArgs = {
  id: Scalars['ID']
}

export type RecipeData = {
  __typename?: 'RecipeData'
  id: Scalars['ID']
  title: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  tags?: Maybe<Scalars['String']>
  ranking: Scalars['Int']
  servings?: Maybe<Scalars['String']>
  difficulty: Scalars['Int']
  preparationTime?: Maybe<Scalars['String']>
  cookingTime?: Maybe<Scalars['String']>
  restTime?: Maybe<Scalars['String']>
  preparations?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  category: CategoryData
  ingredients: Array<IngredientData>
}

export type RemoveImageInput = {
  id: Scalars['ID']
}

export type RemoveImagePayload = {
  __typename?: 'RemoveImagePayload'
  data: Scalars['Boolean']
}

export type RemoveRecipeInput = {
  id: Scalars['ID']
}

export type RemoveRecipePayload = {
  __typename?: 'RemoveRecipePayload'
  data: Scalars['Boolean']
}

export type UpdateImageInput = {
  id: Scalars['ID']
  image: Scalars['String']
  recipe: Scalars['ID']
}

export type UpdateImagePayload = {
  __typename?: 'UpdateImagePayload'
  data: Scalars['Boolean']
}

export type UpdateRecipeInput = {
  id: Scalars['ID']
  title: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  tags?: Maybe<Scalars['String']>
  ranking: Scalars['Int']
  servings?: Maybe<Scalars['String']>
  difficulty: Scalars['Int']
  preparationTime?: Maybe<Scalars['String']>
  cookingTime?: Maybe<Scalars['String']>
  restTime?: Maybe<Scalars['String']>
  preparations?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  category: Scalars['ID']
  ingredients: Array<IngredientDataInput>
}

export type UpdateRecipePayload = {
  __typename?: 'UpdateRecipePayload'
  data: Scalars['Boolean']
}

export type RecipesQueryVariables = {}

export type RecipesQuery = { __typename?: 'Query' } & {
  recipes: Array<
    { __typename?: 'RecipeData' } & Pick<RecipeData, 'id' | 'title'> & {
        category: { __typename?: 'CategoryData' } & Pick<
          CategoryData,
          'id' | 'name'
        >
      }
  >
}

export type RecipeEditQueryVariables = {
  id: Scalars['ID']
}

export type RecipeEditQuery = { __typename?: 'Query' } & {
  recipe: Maybe<
    { __typename?: 'RecipeData' } & Pick<
      RecipeData,
      | 'id'
      | 'title'
      | 'subtitle'
      | 'tags'
      | 'ranking'
      | 'servings'
      | 'difficulty'
      | 'preparationTime'
      | 'cookingTime'
      | 'restTime'
      | 'preparations'
      | 'source'
    > & {
        category: { __typename?: 'CategoryData' } & Pick<CategoryData, 'id'>
        ingredients: Array<
          { __typename?: 'IngredientData' } & Pick<
            IngredientData,
            'amount' | 'ingredient'
          > & {
              measure: { __typename?: 'MeasureData' } & Pick<MeasureData, 'id'>
            }
        >
      }
  >
}

export type UpdateRecipeMutationVariables = {
  id: Scalars['ID']
  title: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  tags?: Maybe<Scalars['String']>
  ranking: Scalars['Int']
  servings?: Maybe<Scalars['String']>
  difficulty: Scalars['Int']
  preparationTime?: Maybe<Scalars['String']>
  cookingTime?: Maybe<Scalars['String']>
  restTime?: Maybe<Scalars['String']>
  preparations?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  category: Scalars['ID']
  ingredients: Array<IngredientDataInput>
}

export type UpdateRecipeMutation = { __typename?: 'Mutation' } & {
  updateRecipe: { __typename?: 'UpdateRecipePayload' } & Pick<
    UpdateRecipePayload,
    'data'
  >
}

export type UpdateImageMutationVariables = {
  id: Scalars['ID']
  image: Scalars['String']
  recipe: Scalars['ID']
}

export type UpdateImageMutation = { __typename?: 'Mutation' } & {
  updateImage: { __typename?: 'UpdateImagePayload' } & Pick<
    UpdateImagePayload,
    'data'
  >
}

export type CreateRecipeMutationVariables = {
  title: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  tags?: Maybe<Scalars['String']>
  ranking: Scalars['Int']
  servings?: Maybe<Scalars['String']>
  difficulty: Scalars['Int']
  preparationTime?: Maybe<Scalars['String']>
  cookingTime?: Maybe<Scalars['String']>
  restTime?: Maybe<Scalars['String']>
  preparations?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  category: Scalars['ID']
  ingredients: Array<IngredientDataInput>
}

export type CreateRecipeMutation = { __typename?: 'Mutation' } & {
  createRecipe: { __typename?: 'CreateRecipePayload' } & {
    data: { __typename?: 'RecipeData' } & Pick<RecipeData, 'id'>
  }
}

export type RecipeViewQueryVariables = {
  id: Scalars['ID']
}

export type RecipeViewQuery = { __typename?: 'Query' } & {
  recipe: Maybe<
    { __typename?: 'RecipeData' } & Pick<
      RecipeData,
      | 'id'
      | 'title'
      | 'subtitle'
      | 'tags'
      | 'ranking'
      | 'servings'
      | 'difficulty'
      | 'preparationTime'
      | 'cookingTime'
      | 'restTime'
      | 'preparations'
      | 'source'
    > & {
        ingredients: Array<
          { __typename?: 'IngredientData' } & Pick<
            IngredientData,
            'amount' | 'ingredient'
          > & {
              measure: { __typename?: 'MeasureData' } & Pick<
                MeasureData,
                'name'
              >
            }
        >
      }
  >
}

export type DeleteRecipeMutationVariables = {
  id: Scalars['ID']
}

export type DeleteRecipeMutation = { __typename?: 'Mutation' } & {
  removeRecipe: { __typename?: 'RemoveRecipePayload' } & Pick<
    RemoveRecipePayload,
    'data'
  >
}

export type MeasuresQueryVariables = {}

export type MeasuresQuery = { __typename?: 'Query' } & {
  measures: Array<
    { __typename?: 'MeasureData' } & Pick<MeasureData, 'id' | 'name'>
  >
}

export type CategoriesQueryVariables = {}

export type CategoriesQuery = { __typename?: 'Query' } & {
  categories: Array<
    { __typename?: 'CategoryData' } & Pick<
      CategoryData,
      'id' | 'name' | 'parent'
    >
  >
}

export type CreateImageMutationVariables = {
  image: Scalars['String']
  recipe: Scalars['ID']
}

export type CreateImageMutation = { __typename?: 'Mutation' } & {
  createImage: { __typename?: 'CreateImagePayload' } & {
    data: { __typename?: 'ImageData' } & Pick<ImageData, 'id'>
  }
}

export type ImageQueryVariables = {
  recipe: Scalars['ID']
}

export type ImageQuery = { __typename?: 'Query' } & {
  image: Maybe<{ __typename?: 'ImageData' } & Pick<ImageData, 'id' | 'image'>>
}

export const RecipesDocument = gql`
  query recipes {
    recipes {
      id
      title
      category {
        id
        name
      }
    }
  }
`

/**
 * __useRecipesQuery__
 *
 * To run a query within a React component, call `useRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RecipesQuery,
    RecipesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<RecipesQuery, RecipesQueryVariables>(
    RecipesDocument,
    baseOptions
  )
}
export function useRecipesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RecipesQuery,
    RecipesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<RecipesQuery, RecipesQueryVariables>(
    RecipesDocument,
    baseOptions
  )
}
export type RecipesQueryHookResult = ReturnType<typeof useRecipesQuery>
export type RecipesLazyQueryHookResult = ReturnType<typeof useRecipesLazyQuery>
export type RecipesQueryResult = ApolloReactCommon.QueryResult<
  RecipesQuery,
  RecipesQueryVariables
>
export const RecipeEditDocument = gql`
  query recipeEdit($id: ID!) {
    recipe(id: $id) {
      id
      title
      subtitle
      tags
      ranking
      servings
      difficulty
      preparationTime
      cookingTime
      restTime
      preparations
      source
      category {
        id
      }
      ingredients {
        amount
        ingredient
        measure {
          id
        }
      }
    }
  }
`

/**
 * __useRecipeEditQuery__
 *
 * To run a query within a React component, call `useRecipeEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeEditQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRecipeEditQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RecipeEditQuery,
    RecipeEditQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<RecipeEditQuery, RecipeEditQueryVariables>(
    RecipeEditDocument,
    baseOptions
  )
}
export function useRecipeEditLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RecipeEditQuery,
    RecipeEditQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    RecipeEditQuery,
    RecipeEditQueryVariables
  >(RecipeEditDocument, baseOptions)
}
export type RecipeEditQueryHookResult = ReturnType<typeof useRecipeEditQuery>
export type RecipeEditLazyQueryHookResult = ReturnType<
  typeof useRecipeEditLazyQuery
>
export type RecipeEditQueryResult = ApolloReactCommon.QueryResult<
  RecipeEditQuery,
  RecipeEditQueryVariables
>
export const UpdateRecipeDocument = gql`
  mutation updateRecipe(
    $id: ID!
    $title: String!
    $subtitle: String
    $tags: String
    $ranking: Int!
    $servings: String
    $difficulty: Int!
    $preparationTime: String
    $cookingTime: String
    $restTime: String
    $preparations: String
    $source: String
    $category: ID!
    $ingredients: [IngredientDataInput!]!
  ) {
    updateRecipe(
      input: {
        id: $id
        title: $title
        subtitle: $subtitle
        tags: $tags
        ranking: $ranking
        servings: $servings
        difficulty: $difficulty
        preparationTime: $preparationTime
        cookingTime: $cookingTime
        restTime: $restTime
        preparations: $preparations
        source: $source
        category: $category
        ingredients: $ingredients
      }
    ) {
      data
    }
  }
`
export type UpdateRecipeMutationFn = ApolloReactCommon.MutationFunction<
  UpdateRecipeMutation,
  UpdateRecipeMutationVariables
>

/**
 * __useUpdateRecipeMutation__
 *
 * To run a mutation, you first call `useUpdateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipeMutation, { data, loading, error }] = useUpdateRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      subtitle: // value for 'subtitle'
 *      tags: // value for 'tags'
 *      ranking: // value for 'ranking'
 *      servings: // value for 'servings'
 *      difficulty: // value for 'difficulty'
 *      preparationTime: // value for 'preparationTime'
 *      cookingTime: // value for 'cookingTime'
 *      restTime: // value for 'restTime'
 *      preparations: // value for 'preparations'
 *      source: // value for 'source'
 *      category: // value for 'category'
 *      ingredients: // value for 'ingredients'
 *   },
 * });
 */
export function useUpdateRecipeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateRecipeMutation,
    UpdateRecipeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateRecipeMutation,
    UpdateRecipeMutationVariables
  >(UpdateRecipeDocument, baseOptions)
}
export type UpdateRecipeMutationHookResult = ReturnType<
  typeof useUpdateRecipeMutation
>
export type UpdateRecipeMutationResult = ApolloReactCommon.MutationResult<
  UpdateRecipeMutation
>
export type UpdateRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateRecipeMutation,
  UpdateRecipeMutationVariables
>
export const UpdateImageDocument = gql`
  mutation updateImage($id: ID!, $image: String!, $recipe: ID!) {
    updateImage(input: { id: $id, image: $image, recipe: $recipe }) {
      data
    }
  }
`
export type UpdateImageMutationFn = ApolloReactCommon.MutationFunction<
  UpdateImageMutation,
  UpdateImageMutationVariables
>

/**
 * __useUpdateImageMutation__
 *
 * To run a mutation, you first call `useUpdateImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImageMutation, { data, loading, error }] = useUpdateImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      image: // value for 'image'
 *      recipe: // value for 'recipe'
 *   },
 * });
 */
export function useUpdateImageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateImageMutation,
    UpdateImageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateImageMutation,
    UpdateImageMutationVariables
  >(UpdateImageDocument, baseOptions)
}
export type UpdateImageMutationHookResult = ReturnType<
  typeof useUpdateImageMutation
>
export type UpdateImageMutationResult = ApolloReactCommon.MutationResult<
  UpdateImageMutation
>
export type UpdateImageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateImageMutation,
  UpdateImageMutationVariables
>
export const CreateRecipeDocument = gql`
  mutation createRecipe(
    $title: String!
    $subtitle: String
    $tags: String
    $ranking: Int!
    $servings: String
    $difficulty: Int!
    $preparationTime: String
    $cookingTime: String
    $restTime: String
    $preparations: String
    $source: String
    $category: ID!
    $ingredients: [IngredientDataInput!]!
  ) {
    createRecipe(
      input: {
        title: $title
        subtitle: $subtitle
        tags: $tags
        ranking: $ranking
        servings: $servings
        difficulty: $difficulty
        preparationTime: $preparationTime
        cookingTime: $cookingTime
        restTime: $restTime
        preparations: $preparations
        source: $source
        category: $category
        ingredients: $ingredients
      }
    ) {
      data {
        id
      }
    }
  }
`
export type CreateRecipeMutationFn = ApolloReactCommon.MutationFunction<
  CreateRecipeMutation,
  CreateRecipeMutationVariables
>

/**
 * __useCreateRecipeMutation__
 *
 * To run a mutation, you first call `useCreateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecipeMutation, { data, loading, error }] = useCreateRecipeMutation({
 *   variables: {
 *      title: // value for 'title'
 *      subtitle: // value for 'subtitle'
 *      tags: // value for 'tags'
 *      ranking: // value for 'ranking'
 *      servings: // value for 'servings'
 *      difficulty: // value for 'difficulty'
 *      preparationTime: // value for 'preparationTime'
 *      cookingTime: // value for 'cookingTime'
 *      restTime: // value for 'restTime'
 *      preparations: // value for 'preparations'
 *      source: // value for 'source'
 *      category: // value for 'category'
 *      ingredients: // value for 'ingredients'
 *   },
 * });
 */
export function useCreateRecipeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateRecipeMutation,
    CreateRecipeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateRecipeMutation,
    CreateRecipeMutationVariables
  >(CreateRecipeDocument, baseOptions)
}
export type CreateRecipeMutationHookResult = ReturnType<
  typeof useCreateRecipeMutation
>
export type CreateRecipeMutationResult = ApolloReactCommon.MutationResult<
  CreateRecipeMutation
>
export type CreateRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateRecipeMutation,
  CreateRecipeMutationVariables
>
export const RecipeViewDocument = gql`
  query recipeView($id: ID!) {
    recipe(id: $id) {
      id
      title
      subtitle
      tags
      ranking
      servings
      difficulty
      preparationTime
      cookingTime
      restTime
      preparations
      source
      ingredients {
        amount
        ingredient
        measure {
          name
        }
      }
    }
  }
`

/**
 * __useRecipeViewQuery__
 *
 * To run a query within a React component, call `useRecipeViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeViewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRecipeViewQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RecipeViewQuery,
    RecipeViewQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<RecipeViewQuery, RecipeViewQueryVariables>(
    RecipeViewDocument,
    baseOptions
  )
}
export function useRecipeViewLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RecipeViewQuery,
    RecipeViewQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    RecipeViewQuery,
    RecipeViewQueryVariables
  >(RecipeViewDocument, baseOptions)
}
export type RecipeViewQueryHookResult = ReturnType<typeof useRecipeViewQuery>
export type RecipeViewLazyQueryHookResult = ReturnType<
  typeof useRecipeViewLazyQuery
>
export type RecipeViewQueryResult = ApolloReactCommon.QueryResult<
  RecipeViewQuery,
  RecipeViewQueryVariables
>
export const DeleteRecipeDocument = gql`
  mutation deleteRecipe($id: ID!) {
    removeRecipe(input: { id: $id }) {
      data
    }
  }
`
export type DeleteRecipeMutationFn = ApolloReactCommon.MutationFunction<
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables
>

/**
 * __useDeleteRecipeMutation__
 *
 * To run a mutation, you first call `useDeleteRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecipeMutation, { data, loading, error }] = useDeleteRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRecipeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteRecipeMutation,
    DeleteRecipeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteRecipeMutation,
    DeleteRecipeMutationVariables
  >(DeleteRecipeDocument, baseOptions)
}
export type DeleteRecipeMutationHookResult = ReturnType<
  typeof useDeleteRecipeMutation
>
export type DeleteRecipeMutationResult = ApolloReactCommon.MutationResult<
  DeleteRecipeMutation
>
export type DeleteRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteRecipeMutation,
  DeleteRecipeMutationVariables
>
export const MeasuresDocument = gql`
  query measures {
    measures {
      id
      name
    }
  }
`

/**
 * __useMeasuresQuery__
 *
 * To run a query within a React component, call `useMeasuresQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeasuresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeasuresQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeasuresQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MeasuresQuery,
    MeasuresQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<MeasuresQuery, MeasuresQueryVariables>(
    MeasuresDocument,
    baseOptions
  )
}
export function useMeasuresLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeasuresQuery,
    MeasuresQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<MeasuresQuery, MeasuresQueryVariables>(
    MeasuresDocument,
    baseOptions
  )
}
export type MeasuresQueryHookResult = ReturnType<typeof useMeasuresQuery>
export type MeasuresLazyQueryHookResult = ReturnType<
  typeof useMeasuresLazyQuery
>
export type MeasuresQueryResult = ApolloReactCommon.QueryResult<
  MeasuresQuery,
  MeasuresQueryVariables
>
export const CategoriesDocument = gql`
  query categories {
    categories {
      id
      name
      parent
    }
  }
`

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    baseOptions
  )
}
export function useCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    CategoriesQuery,
    CategoriesQueryVariables
  >(CategoriesDocument, baseOptions)
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>
export type CategoriesLazyQueryHookResult = ReturnType<
  typeof useCategoriesLazyQuery
>
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<
  CategoriesQuery,
  CategoriesQueryVariables
>
export const CreateImageDocument = gql`
  mutation createImage($image: String!, $recipe: ID!) {
    createImage(input: { image: $image, recipe: $recipe }) {
      data {
        id
      }
    }
  }
`
export type CreateImageMutationFn = ApolloReactCommon.MutationFunction<
  CreateImageMutation,
  CreateImageMutationVariables
>

/**
 * __useCreateImageMutation__
 *
 * To run a mutation, you first call `useCreateImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createImageMutation, { data, loading, error }] = useCreateImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *      recipe: // value for 'recipe'
 *   },
 * });
 */
export function useCreateImageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateImageMutation,
    CreateImageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateImageMutation,
    CreateImageMutationVariables
  >(CreateImageDocument, baseOptions)
}
export type CreateImageMutationHookResult = ReturnType<
  typeof useCreateImageMutation
>
export type CreateImageMutationResult = ApolloReactCommon.MutationResult<
  CreateImageMutation
>
export type CreateImageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateImageMutation,
  CreateImageMutationVariables
>
export const ImageDocument = gql`
  query image($recipe: ID!) {
    image(recipeId: $recipe) {
      id
      image
    }
  }
`

/**
 * __useImageQuery__
 *
 * To run a query within a React component, call `useImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageQuery({
 *   variables: {
 *      recipe: // value for 'recipe'
 *   },
 * });
 */
export function useImageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ImageQuery,
    ImageQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ImageQuery, ImageQueryVariables>(
    ImageDocument,
    baseOptions
  )
}
export function useImageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ImageQuery,
    ImageQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ImageQuery, ImageQueryVariables>(
    ImageDocument,
    baseOptions
  )
}
export type ImageQueryHookResult = ReturnType<typeof useImageQuery>
export type ImageLazyQueryHookResult = ReturnType<typeof useImageLazyQuery>
export type ImageQueryResult = ApolloReactCommon.QueryResult<
  ImageQuery,
  ImageQueryVariables
>
