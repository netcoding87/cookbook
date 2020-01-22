/**
 * auto generated by graphql-codegen
 * DO NOT EDIT THIS FILE BY HAND
 */

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CategoryData = {
   __typename?: 'CategoryData',
  id: Scalars['ID'],
  name: Scalars['String'],
  parent: Scalars['ID'],
};

export type CreateImageInput = {
  image: Scalars['String'],
  recipe: Scalars['ID'],
};

export type CreateImagePayload = {
   __typename?: 'CreateImagePayload',
  data: ImageData,
};

export type CreateIngredientInput = {
  amount: Scalars['String'],
  ingredient: Scalars['String'],
  measure: Scalars['ID'],
};

export type CreateIngredientPayload = {
   __typename?: 'CreateIngredientPayload',
  data: IngredientData,
};

export type CreateRecipeInput = {
  title: Scalars['String'],
  subtitle?: Maybe<Scalars['String']>,
  tags?: Maybe<Scalars['String']>,
  ranking: Scalars['Int'],
  servings?: Maybe<Scalars['String']>,
  difficulty: Scalars['Int'],
  preparationTime?: Maybe<Scalars['String']>,
  cookingTime?: Maybe<Scalars['String']>,
  restTime?: Maybe<Scalars['String']>,
  preparations?: Maybe<Scalars['String']>,
  source?: Maybe<Scalars['String']>,
  category: Scalars['ID'],
};

export type CreateRecipePayload = {
   __typename?: 'CreateRecipePayload',
  data: RecipeData,
};

export type ImageData = {
   __typename?: 'ImageData',
  id: Scalars['ID'],
  image: Scalars['String'],
  recipe: Scalars['ID'],
};

export type IngredientData = {
   __typename?: 'IngredientData',
  id: Scalars['ID'],
  amount?: Maybe<Scalars['String']>,
  ingredient: Scalars['String'],
  measure: MeasureData,
};

export type MeasureData = {
   __typename?: 'MeasureData',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createImage: CreateImagePayload,
  removeImage: RemoveImagePayload,
  updateImage: UpdateImagePayload,
  createRecipe: CreateRecipePayload,
  removeRecipe: RemoveRecipePayload,
  updateRecipe: UpdateRecipePayload,
  createIngredient: CreateIngredientPayload,
  removeIngredient: RemoveIngredientPayload,
  updateIngredient: UpdateIngredientPayload,
};


export type MutationCreateImageArgs = {
  input: CreateImageInput
};


export type MutationRemoveImageArgs = {
  input: RemoveImageInput
};


export type MutationUpdateImageArgs = {
  input: UpdateImageInput
};


export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput
};


export type MutationRemoveRecipeArgs = {
  input: RemoveRecipeInput
};


export type MutationUpdateRecipeArgs = {
  input: UpdateRecipeInput
};


export type MutationCreateIngredientArgs = {
  input: CreateIngredientInput
};


export type MutationRemoveIngredientArgs = {
  input: RemoveIngredientInput
};


export type MutationUpdateIngredientArgs = {
  input: UpdateIngredientInput
};

export type Query = {
   __typename?: 'Query',
  categories: Array<CategoryData>,
  image?: Maybe<ImageData>,
  measures: Array<MeasureData>,
  recipes: Array<RecipeData>,
  recipe?: Maybe<RecipeData>,
};


export type QueryImageArgs = {
  recipeId: Scalars['ID']
};


export type QueryRecipeArgs = {
  id: Scalars['ID']
};

export type RecipeData = {
   __typename?: 'RecipeData',
  id: Scalars['ID'],
  title: Scalars['String'],
  subtitle?: Maybe<Scalars['String']>,
  tags?: Maybe<Scalars['String']>,
  ranking: Scalars['Int'],
  servings?: Maybe<Scalars['String']>,
  difficulty: Scalars['Int'],
  preparationTime?: Maybe<Scalars['String']>,
  cookingTime?: Maybe<Scalars['String']>,
  restTime?: Maybe<Scalars['String']>,
  preparations?: Maybe<Scalars['String']>,
  source?: Maybe<Scalars['String']>,
  category: CategoryData,
  ingredients: Array<IngredientData>,
};

export type RemoveImageInput = {
  id: Scalars['ID'],
};

export type RemoveImagePayload = {
   __typename?: 'RemoveImagePayload',
  data: Scalars['Boolean'],
};

export type RemoveIngredientInput = {
  id: Scalars['ID'],
};

export type RemoveIngredientPayload = {
   __typename?: 'RemoveIngredientPayload',
  data: Scalars['Boolean'],
};

export type RemoveRecipeInput = {
  id: Scalars['ID'],
};

export type RemoveRecipePayload = {
   __typename?: 'RemoveRecipePayload',
  data: Scalars['Boolean'],
};

export type UpdateImageInput = {
  id: Scalars['ID'],
  image: Scalars['String'],
  recipe: Scalars['ID'],
};

export type UpdateImagePayload = {
   __typename?: 'UpdateImagePayload',
  data: Scalars['Boolean'],
};

export type UpdateIngredientInput = {
  id: Scalars['ID'],
  amount: Scalars['String'],
  ingredient: Scalars['String'],
  measure: Scalars['ID'],
};

export type UpdateIngredientPayload = {
   __typename?: 'UpdateIngredientPayload',
  data: Scalars['Boolean'],
};

export type UpdateRecipeInput = {
  id: Scalars['ID'],
  title: Scalars['String'],
  subtitle?: Maybe<Scalars['String']>,
  tags?: Maybe<Scalars['String']>,
  ranking: Scalars['Int'],
  servings?: Maybe<Scalars['String']>,
  difficulty: Scalars['Int'],
  preparationTime?: Maybe<Scalars['String']>,
  cookingTime?: Maybe<Scalars['String']>,
  restTime?: Maybe<Scalars['String']>,
  preparations?: Maybe<Scalars['String']>,
  source?: Maybe<Scalars['String']>,
  category: Scalars['ID'],
};

export type UpdateRecipePayload = {
   __typename?: 'UpdateRecipePayload',
  data: Scalars['Boolean'],
};

export type CategoriesQueryVariables = {};


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'CategoryData' }
    & Pick<CategoryData, 'id' | 'name' | 'parent'>
  )> }
);

export type MeasuresQueryVariables = {};


export type MeasuresQuery = (
  { __typename?: 'Query' }
  & { measures: Array<(
    { __typename?: 'MeasureData' }
    & Pick<MeasureData, 'id' | 'name'>
  )> }
);


export const CategoriesDocument = gql`
    query categories {
  categories {
    id
    name
    parent
  }
}
    `;

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
export function useCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const MeasuresDocument = gql`
    query measures {
  measures {
    id
    name
  }
}
    `;

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
export function useMeasuresQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeasuresQuery, MeasuresQueryVariables>) {
        return ApolloReactHooks.useQuery<MeasuresQuery, MeasuresQueryVariables>(MeasuresDocument, baseOptions);
      }
export function useMeasuresLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeasuresQuery, MeasuresQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeasuresQuery, MeasuresQueryVariables>(MeasuresDocument, baseOptions);
        }
export type MeasuresQueryHookResult = ReturnType<typeof useMeasuresQuery>;
export type MeasuresLazyQueryHookResult = ReturnType<typeof useMeasuresLazyQuery>;
export type MeasuresQueryResult = ApolloReactCommon.QueryResult<MeasuresQuery, MeasuresQueryVariables>;