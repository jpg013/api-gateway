const express                                      = require('express')
const { INTERNAL_SERVER_ERROR, getStatusText, OK } = require('http-status-codes')
const { extract_proxy_headers }                    = require('../proxy')
const graphql_controller                           = require('./graphql_controller')
const auth_controller                              = require('./auth_controller')
const user_controller                              = require('./user_controller')

const config = container => {
  const api_v1 = express.Router()

  // ======================================================
  // Proxy Middleware
  // ======================================================
  api_v1.use(extract_proxy_headers)

  // ======================================================
  // API GraphQL
  // ======================================================
  api_v1.use('/graphql', graphql_controller.connect(container))

  // ======================================================
  // API Proxy
  // ======================================================
  api_v1.use('/auth', auth_controller.connect(container), handle_error_response, handle_results)
  api_v1.use('/user', user_controller.connect(container), handle_error_response, handle_results)

  // ======================================================
  // Error/Response Handling
  // ======================================================
  function handle_error_response(err, req, res, next) {
    console.log(err)
    const { message, status } = err

    req.error = {
      message,
      status: status || INTERNAL_SERVER_ERROR,
      statusText: getStatusText(status || INTERNAL_SERVER_ERROR)
    }

    next()
  }

  function handle_results(req, res) {
    if (req.error) {
      res.status(req.error.status).send(req.error)
    } else {
      res.status(OK).send(req.results)
    }
  }

  return api_v1
}

module.exports = Object.create({config})
