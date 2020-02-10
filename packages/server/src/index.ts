import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import express from 'express'
import schema from './graphql/schema'


const isDevelopment = process.env.NODE_ENV === 'development'
const PORT = process.env.PORT || 4321

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
  return {
    start: () => {
      app.listen({ port: PORT }, () =>
        console.info(
          `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        )
      )
    },
  }
}

if (process.env.NODE_ENV === 'development') {
  Server().start()
}
