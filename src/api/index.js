const api_v1            = require('./v1')
const express           = require('express')

const config_api = container => {
  const api_router = express.Router()

  api_router.use('/v1', api_v1.config(container))

  return api_router
}

module.exports = config_api
