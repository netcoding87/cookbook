import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import express from 'express'
import * as typeDefs from '../../graphql/schema.graphql'
import resolvers from './resolvers'
import createContext from './utils/createContext'


const isDevelopment = process.env.NODE_ENV === 'development'
const PORT = process.env.PORT || 4321

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

const server = new ApolloServer({
  schema,
  context: createContext,
  playground: isDevelopment,
  introspection: isDevelopment,
  formatError: error => {
    isDevelopment
      ? console.error(`Error in ApolloServer initializations: ${error}`)
      : null
    return error
  },
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: PORT }, () =>
  console.info(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
)
