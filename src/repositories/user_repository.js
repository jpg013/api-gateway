const dial = require('../lib/dial')

function user_repository(container={}) {
  const { api_prefix } = container

  async function get_logged_in_user(options={}) {
    return await dial(`${api_prefix.analytics}/user/GetMyAccount`, 'get', options)
  }

  return {
    get_logged_in_user
  }
}

async function connect(container) {
  return user_repository(container)
}

module.exports = Object.create({connect})
