const http_status_codes = require('http-status-codes')
const DependencyError   = require('../../errors/dependency_error')
const express           = require('express')
const express_graphql   = require('express-graphql')

const connect = container => {
  const graphql_controller = express.Router()

  // ======================================================
  // Mount routes to router
  // ======================================================

  graphql_controller.use(express_graphql({
    schema: container.graphql.schema,
    graphiql: process.env.NODE_ENV !== 'production',
    formatError: error => {
      const status = http_status_codes[error.message.toUpperCase()] || http_status_codes.INTERNAL_SERVER_ERROR

      return {
        message: error.message,
        stack: error.stack,
        path: error.path,
        status: status,
        statusText: status && http_status_codes.getStatusText(status)
      }
    }
  }))

  return graphql_controller
}

module.exports = Object.assign({ connect })
