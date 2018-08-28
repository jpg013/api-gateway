const activity_repository   = require('./activity_repository')
const auth_repository       = require('./auth_repository')
const user_repository       = require('./user_repository')
const influencer_repository = require('./influencer_repository')

async function connect(container) {
  const repositories = {
    activity_repository: await activity_repository.connect(container),
    auth_repository: await auth_repository.connect(container),
    user_repository: await user_repository.connect(container),
    influencer_repository: await influencer_repository.connect(container)
  }

  return Object.assign({}, container, {
    repositories
  })
}

module.exports = Object.create({connect})
