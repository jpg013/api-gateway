const { GraphQLObjectType, GraphQLInt } = require('graphql')
const portal_counts_object              = require('../objects/portal_counts_object')
const DependencyError                   = require('../../errors/dependency_error')

async function connect(container={}) {
  const { repositories: {
    influencer_repository,
    activity_repository
  }} = container

  if (!activity_repository) {
    throw new DependencyError('Activity Repository must be defined')
  }

  if (!influencer_repository) {
    throw new DependencyError('Influencer Repository must be defined')
  }

  async function query_resolver(parent, args, req) {
    // Proxy options
    const options = {
      headers: { ...req.proxy_headers }
    }

    const [activity_count, influencer_count] = await Promise.all([
      activity_repository.get_activity_count(options),
      influencer_repository.get_influencer_count(options)
    ])

    return {
      activity_count,
      influencer_count
    }
  }

  return {
    type: portal_counts_object,
    description: 'Influence portal counts query',
    resolve: query_resolver,
    args: {
      first: { type: GraphQLInt, default: 20 },
      offset: { type: GraphQLInt }
    }
  }
}

module.exports = connect
