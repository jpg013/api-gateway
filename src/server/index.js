const express         = require('express')
const morgan          = require('morgan')
const helmet          = require('helmet')
const bodyParser      = require('body-parser')
const path            = require('path')
const config_api      = require('../api')

const start = (container) => {
  return new Promise((resolve, reject) => {
    const { server_settings, path_settings, logger } = container

    if (!server_settings.port) {
      return reject(new Error('The server must be started with an available port.'))
    }

    const app = express()

    app.use(morgan('dev'))
    app.use(helmet())
    app.use(bodyParser.json({limit: '50mb'}))
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
    app.use(express.static(path.resolve(path_settings.public_file_path)))

    // Mount the API
    app.use(config_api(container))

    const server = app.listen(server_settings.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, { start })
