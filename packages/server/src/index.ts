import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import bodyParser from 'body-parser'
import express from 'express'
import * as typeDefs from './graphql/schema.graphql'
import resolvers from './resolvers'


const isDevelopment = process.env.NODE_ENV === 'development'
const PORT = process.env.PORT || 4321

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

const server = new ApolloServer({
  schema,
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
app.use(
  bodyParser.json({
    limit: '25mb',
  })
)
server.applyMiddleware({ app })

export const Server = () => {
  let httpServer: any
  return {
    start: () => {
      httpServer = app.listen({ port: PORT }, () =>
        console.info(
          `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        )
      )
    },
    stop: () => {
      httpServer &&
        httpServer.close(() => {
          console.info('🚨 Server stopped')
        })
    },
  }
}

if (process.env.NODE_ENV === 'development') {
  Server().start()
}
