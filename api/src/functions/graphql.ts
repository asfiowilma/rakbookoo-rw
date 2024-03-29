import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import generateGraphiQLHeader from 'src/lib/generateGraphiQLHeader'
import { logger } from 'src/lib/logger'
import services from 'src/services/**/*.{js,ts}'

export const handler = createGraphQLHandler({
  getCurrentUser,
  generateGraphiQLHeader,
  loggerConfig: { logger, options: { operationName: true, tracing: true } },
  directives,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
