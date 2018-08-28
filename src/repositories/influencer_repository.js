const dial                = require('../lib/dial')
const dependency_error    = require('../errors/dependency_error')

function influencer_repository(container={}) {
  const { api_prefix } = container

  async function get_influencer_count(options={}) {
    return await dial(`${api_prefix.influence}/subject/count`, 'get', options)
  }

  return {
    get_influencer_count
  }
}

async function connect(container) {
  return influencer_repository(container)
}

module.exports = Object.create({connect})
