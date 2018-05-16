'use strict'

function init_di ({
  server_settings,
  path_settings,
  api_prefix
}, mediator) {

  mediator.once('init', () => {
    // POJO container for DI
    const container = {
      services: {},
      server_settings: { ...server_settings },
      path_settings: { ...path_settings },
      api_prefix: { ...api_prefix }
    }

    mediator.emit('di.ready', container)
  })
}

module.exports.init_di = init_di
