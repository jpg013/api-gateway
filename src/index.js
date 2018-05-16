'use strict'

const { EventEmitter }                = require('events')
const server                          = require('./server')
const config                          = require('./config')
const mediator                        = new EventEmitter()
const graphql                         = require('./graphql')
const repositories                    = require('./repositories')

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

async function onDIReady(container) {
  try {
    // Attach the mediator
    container.mediator = mediator

    // Connect repositories
    container = await repositories.connect(container)

    // Connect graphql
    container = await graphql.connect(container)

    // Start the server
    const app = await server.start(container)
    console.log(`Server started succesfully, running on port: ${container.server_settings.port}.`)
    app.on('close', () => console.log('application closing.'))
  } catch(err) {
    console.error(err)
  }
}

mediator.on('di.ready', onDIReady)
config.init(mediator)
mediator.emit('init')
