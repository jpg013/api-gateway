const { OK }          = require('http-status-codes')
const DependencyError = require('../../errors/dependency_error')
const express         = require('express')

const connect = container => {
  const { repositories: { user_repository }} = container

  if (!user_repository) {
    throw new DependencyError('user_repository is required.')
  }

  const user_controller = express.Router()

  const get_logged_in_user = async (req, res, next) => {
    const { proxy_headers } = req
    const options = { headers: { ...proxy_headers }}


  }

  user_controller.get('/logged_in', get_logged_in_user)

  return user_controller
}

module.exports = Object.assign({ connect })
