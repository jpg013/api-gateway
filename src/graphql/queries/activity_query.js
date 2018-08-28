const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt
}                          = require('graphql')
const activity_feed_object = require('../objects/activity_feed_object')
const DependencyError      = require('../../errors/dependency_error')

const default_query_args = {
  first: 1000,
  offset: 0
}

async function connect(container={}) {
  const { repositories: { activity_repository }} = container

  if (!activity_repository) {
    throw new DependencyError('Activity Repository must be defined')
  }

  async function query_resolver(parent, args, req) {
    // Proxy options
    const options = {
      headers: { ...req.proxy_headers }
    }

    const result = await activity_repository.get_activity(options)
    const start = args.offset || default_query_args.offset
    const end = start + (args.first || default_query_args.first)

    return result.slice(start, end)
  }

  return {
    type: new GraphQLList(activity_object),
    description: 'Activity feeds query',
    resolve: query_resolver,
    args: {
      first: { type: GraphQLInt, default: 20 },
      offset: { type: GraphQLInt }
    }
  }
}

module.exports = connect
