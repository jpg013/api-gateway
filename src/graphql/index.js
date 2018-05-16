const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const activity_feeds_query = require('./queries/activity_feeds_query')
const logged_in_user_query = require('./queries/logged_in_user_query')

async function connect(container) {
  const activity_feeds = await activity_feeds_query.connect(container)
  const logged_in_user = await logged_in_user_query.connect(container)

  const root_query_type = new GraphQLObjectType({
    name: 'RootQuerySchema',
    desciption: 'Root query schema for Influence Api',
    fields: () => ({
      activity_feeds,
      logged_in_user
    })
  })

  const graphql = {
    schema: new GraphQLSchema({
      query: root_query_type
    })
  }

  return Object.assign({}, container, { graphql })
}

module.exports = Object.create({connect})
