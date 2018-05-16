const { OK }          = require('http-status-codes')
const DependencyError = require('../../errors/dependency_error')
const express         = require('express')

const connect = container => {
  const { repositories: { auth_repository }} = container

  if (!auth_repository) {
    throw new DependencyError('auth_repository is required.')
  }

  const auth_controller = express.Router()

  const post_login = async (req, res, next) => {
    const {
      username,
      password
    } = req.body

    const options = {
      params: {
        username,
        password
      }
    }

    try {
      req.results = await auth_repository.login(options)

      next()
    } catch(err) {
      next(err)
    }
  }

  auth_controller.post('/login', post_login)

  return auth_controller
}

module.exports = Object.assign({ connect })
