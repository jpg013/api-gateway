const dial = require('../lib/dial')

function auth_repository(container={}) {
  const { api_prefix } = container

  async function login(options={}) {
    return await dial(`${api_prefix.analytics}/user/Login`, 'get', options)
  }

  return {
    login
  }
}

async function connect(container) {
  return auth_repository(container)
}

module.exports = Object.create({connect})
