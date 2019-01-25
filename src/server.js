import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { resolvers, typeDefs } from './schema'

dotenv.config()

const { PORT = 4000, NODE_ENV = 'development' } = process.env
const IN_PROD = NODE_ENV === 'production'

const app = express()

app.disable('x-powered-by')

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    const playground = {
      settings: {
        'editor.cursorShape': 'line',
      },
    }

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD && playground,
    })

    server.applyMiddleware({ app })

    app.listen({ port: PORT }, () => {
      console.log(
        `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    })
  })
  .catch(err => console.error(err))
