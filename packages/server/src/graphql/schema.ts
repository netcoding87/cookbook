import { makeExecutableSchema } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'
import 'graphql-import-node'
import resolvers from '../resolvers'
import * as typeDefs from './schema.graphql'


const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema
