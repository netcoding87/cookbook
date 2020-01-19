/**
 * auto generated by graphql-codegen
 * DO NOT EDIT THIS FILE BY HAND
 */

import { GraphQLResolveInfo } from 'graphql';
import { ContextType } from '../utils/createContext';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

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

export type UpdateRecipeInput = {
  id: Scalars['ID'],
  title: Scalars['String'],
  category: Scalars['ID'],
};

export type UpdateRecipePayload = {
   __typename?: 'UpdateRecipePayload',
  data: Scalars['Boolean'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  CategoryData: ResolverTypeWrapper<CategoryData>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  ImageData: ResolverTypeWrapper<ImageData>,
  MeasureData: ResolverTypeWrapper<MeasureData>,
  RecipeData: ResolverTypeWrapper<RecipeData>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  IngredientData: ResolverTypeWrapper<IngredientData>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateImageInput: CreateImageInput,
  CreateImagePayload: ResolverTypeWrapper<CreateImagePayload>,
  RemoveImageInput: RemoveImageInput,
  RemoveImagePayload: ResolverTypeWrapper<RemoveImagePayload>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  UpdateImageInput: UpdateImageInput,
  UpdateImagePayload: ResolverTypeWrapper<UpdateImagePayload>,
  CreateRecipeInput: CreateRecipeInput,
  CreateRecipePayload: ResolverTypeWrapper<CreateRecipePayload>,
  RemoveRecipeInput: RemoveRecipeInput,
  RemoveRecipePayload: ResolverTypeWrapper<RemoveRecipePayload>,
  UpdateRecipeInput: UpdateRecipeInput,
  UpdateRecipePayload: ResolverTypeWrapper<UpdateRecipePayload>,
  CreateIngredientInput: CreateIngredientInput,
  CreateIngredientPayload: ResolverTypeWrapper<CreateIngredientPayload>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  CategoryData: CategoryData,
  ID: Scalars['ID'],
  String: Scalars['String'],
  ImageData: ImageData,
  MeasureData: MeasureData,
  RecipeData: RecipeData,
  Int: Scalars['Int'],
  IngredientData: IngredientData,
  Mutation: {},
  CreateImageInput: CreateImageInput,
  CreateImagePayload: CreateImagePayload,
  RemoveImageInput: RemoveImageInput,
  RemoveImagePayload: RemoveImagePayload,
  Boolean: Scalars['Boolean'],
  UpdateImageInput: UpdateImageInput,
  UpdateImagePayload: UpdateImagePayload,
  CreateRecipeInput: CreateRecipeInput,
  CreateRecipePayload: CreateRecipePayload,
  RemoveRecipeInput: RemoveRecipeInput,
  RemoveRecipePayload: RemoveRecipePayload,
  UpdateRecipeInput: UpdateRecipeInput,
  UpdateRecipePayload: UpdateRecipePayload,
  CreateIngredientInput: CreateIngredientInput,
  CreateIngredientPayload: CreateIngredientPayload,
};

export type CategoryDataResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['CategoryData'] = ResolversParentTypes['CategoryData']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  parent?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type CreateImagePayloadResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['CreateImagePayload'] = ResolversParentTypes['CreateImagePayload']> = {
  data?: Resolver<ResolversTypes['ImageData'], ParentType, ContextType>,
};

export type CreateIngredientPayloadResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['CreateIngredientPayload'] = ResolversParentTypes['CreateIngredientPayload']> = {
  data?: Resolver<ResolversTypes['IngredientData'], ParentType, ContextType>,
};

export type CreateRecipePayloadResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['CreateRecipePayload'] = ResolversParentTypes['CreateRecipePayload']> = {
  data?: Resolver<ResolversTypes['RecipeData'], ParentType, ContextType>,
};

export type ImageDataResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['ImageData'] = ResolversParentTypes['ImageData']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  recipe?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type IngredientDataResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['IngredientData'] = ResolversParentTypes['IngredientData']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  amount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  ingredient?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  measure?: Resolver<ResolversTypes['MeasureData'], ParentType, ContextType>,
};

export type MeasureDataResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['MeasureData'] = ResolversParentTypes['MeasureData']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createImage?: Resolver<ResolversTypes['CreateImagePayload'], ParentType, ContextType, RequireFields<MutationCreateImageArgs, 'input'>>,
  removeImage?: Resolver<ResolversTypes['RemoveImagePayload'], ParentType, ContextType, RequireFields<MutationRemoveImageArgs, 'input'>>,
  updateImage?: Resolver<ResolversTypes['UpdateImagePayload'], ParentType, ContextType, RequireFields<MutationUpdateImageArgs, 'input'>>,
  createRecipe?: Resolver<ResolversTypes['CreateRecipePayload'], ParentType, ContextType, RequireFields<MutationCreateRecipeArgs, 'input'>>,
  removeRecipe?: Resolver<ResolversTypes['RemoveRecipePayload'], ParentType, ContextType, RequireFields<MutationRemoveRecipeArgs, 'input'>>,
  updateRecipe?: Resolver<ResolversTypes['UpdateRecipePayload'], ParentType, ContextType, RequireFields<MutationUpdateRecipeArgs, 'input'>>,
  createIngredient?: Resolver<ResolversTypes['CreateIngredientPayload'], ParentType, ContextType, RequireFields<MutationCreateIngredientArgs, 'input'>>,
};

export type QueryResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['CategoryData']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['ImageData']>, ParentType, ContextType, RequireFields<QueryImageArgs, 'recipeId'>>,
  measures?: Resolver<Array<ResolversTypes['MeasureData']>, ParentType, ContextType>,
  recipes?: Resolver<Array<ResolversTypes['RecipeData']>, ParentType, ContextType>,
  recipe?: Resolver<Maybe<ResolversTypes['RecipeData']>, ParentType, ContextType, RequireFields<QueryRecipeArgs, 'id'>>,
};

export type RecipeDataResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['RecipeData'] = ResolversParentTypes['RecipeData']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  subtitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  ranking?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  servings?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  difficulty?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  preparationTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cookingTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  restTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  preparations?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  category?: Resolver<ResolversTypes['CategoryData'], ParentType, ContextType>,
  ingredients?: Resolver<Array<ResolversTypes['IngredientData']>, ParentType, ContextType>,
};

export type RemoveImagePayloadResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['RemoveImagePayload'] = ResolversParentTypes['RemoveImagePayload']> = {
  data?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type RemoveRecipePayloadResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['RemoveRecipePayload'] = ResolversParentTypes['RemoveRecipePayload']> = {
  data?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type UpdateImagePayloadResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['UpdateImagePayload'] = ResolversParentTypes['UpdateImagePayload']> = {
  data?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type UpdateRecipePayloadResolvers<ContextType = ContextType, ParentType extends ResolversParentTypes['UpdateRecipePayload'] = ResolversParentTypes['UpdateRecipePayload']> = {
  data?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type Resolvers<ContextType = ContextType> = {
  CategoryData?: CategoryDataResolvers<ContextType>,
  CreateImagePayload?: CreateImagePayloadResolvers<ContextType>,
  CreateIngredientPayload?: CreateIngredientPayloadResolvers<ContextType>,
  CreateRecipePayload?: CreateRecipePayloadResolvers<ContextType>,
  ImageData?: ImageDataResolvers<ContextType>,
  IngredientData?: IngredientDataResolvers<ContextType>,
  MeasureData?: MeasureDataResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  RecipeData?: RecipeDataResolvers<ContextType>,
  RemoveImagePayload?: RemoveImagePayloadResolvers<ContextType>,
  RemoveRecipePayload?: RemoveRecipePayloadResolvers<ContextType>,
  UpdateImagePayload?: UpdateImagePayloadResolvers<ContextType>,
  UpdateRecipePayload?: UpdateRecipePayloadResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = ContextType> = Resolvers<ContextType>;
