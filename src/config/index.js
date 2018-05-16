const {
  server_settings,
  path_settings,
  api_prefix
}                    = require('./config')
const di             = require('./di')

const bind_args = {
  server_settings,
  path_settings,
  api_prefix
}

const init = di.init_di.bind(null, bind_args)

module.exports = Object.create({ init })
