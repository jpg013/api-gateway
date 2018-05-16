const { GraphQLObjectType, GraphQLInt } = require('graphql')
const user_object                       = require('../objects/user_object')
const DependencyError                   = require('../../errors/dependency_error')
const map_user_object                   = require('../mappers/map_user_object')

async function connect(container={}) {
  const { repositories: { user_repository }} = container

  if (!user_repository) {
    throw new DependencyError('user_repository must be defined.')
  }

  async function query_resolver(parent, args, req) {
    // Create options
    const options = {
      headers: { ...req.proxy_headers }
    }

    const result = await user_repository.get_logged_in_user(options)
    
    return map_user_object(result)
  }

  return {
    type: user_object,
    description: 'Logged In User Query',
    resolve: query_resolver
  }
}

module.exports = Object.create({connect})
