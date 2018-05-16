const dial                = require('../lib/dial')
const dependency_error    = require('../errors/dependency_error')

function activity_repository(container={}) {
  const { api_prefix } = container

  async function get_activity(options={}) {
    return await dial(`${api_prefix.influence}/analysis`, 'get', options)
  }

  return {
    get_activity
  }
}

async function connect(container) {
  return activity_repository(container)
}

module.exports = Object.create({connect})
