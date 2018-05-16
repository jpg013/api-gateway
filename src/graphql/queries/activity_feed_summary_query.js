const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt
}                          = require('graphql')
const header_counts_object = require('../objects/header_counts_object')
const sentiment_object     = require('../objects/sentiment_object')
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

  async function query_resolver(obj, args, context, info) {
    // Create options
    const options = {
      headers: {
        auth: context.headers.auth ? context.headers.auth : undefined
      }
    }

    const result = await activity_repository.get_activity(options)
    const start = args.offset || default_query_args.offset
    const end = start + (args.first || default_query_args.first)

    return result.slice(start, end)
  }

  return {
    type: new GraphQLList(activity_feed_object),
    description: 'Activity feed summary query',
    resolve: query_resolver,
    args: {
      first: { type: GraphQLInt, default: 2 },
      offset: { type: GraphQLInt }
    }
  }
}

module.exports = Object.create({connect})
