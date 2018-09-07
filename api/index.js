const {
  getHealth
}                            = require('./routes/health-routes');
// const logger              = require('../common/logger');
const { ApolloServer }       = require('apollo-server-express');
// const httpStatusCodes     = require('http-status-codes');
const express                = require('express');
const config                 = require('../config');
const graphqlSchema          = require('../graphql/schema');
const {
  parseRequestBearer,
  // responseWriter,
  // errorHandler,
}                            = require('./middleware');

module.exports = function api(app) {
  /**
   * Declare router, apply middleware and mount routes
   */
  const apiRouter = express.Router();

  /**
   * Declare router, apply middleware and mount routes
   */

  apiRouter.get('/health', getHealth(config));

  apiRouter.use(parseRequestBearer);

  const server = new ApolloServer({
    schema: graphqlSchema,
    context: ({ req }) => {
      return {
        bearerToken: req.bearerToken
      };
    },
    // TODO - handle error formatting better, abstract somewhere else
    formatError: error => {
      return {
        status: error.extensions.exception.status,
        statusText: error.extensions.exception.statusText,
        message: error.message,
        path: error.path,
      };
    }
  });

  server.applyMiddleware({ app: apiRouter });

  /**
   * GraphQL
   */

  app.use(apiRouter);
};
