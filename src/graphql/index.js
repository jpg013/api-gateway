const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const connect_activity_query               = require('./queries/activity_query')
const connect_user_account_query           = require('./queries/user_account_query')
const connect_portal_counts_query          = require('./queries/portal_counts_query')
const connnect_activity_summary_query      = require('./queries/activity_summary_query')

async function connect(container) {
  const activity_query         = await connect_activity_query(container)
  const user_account_query     = await connect_user_account_query(container)
  const portal_counts_query    = await connect_portal_counts_query(container)
  const activity_summary_query = await connnect_activity_summary_query(container)

  const root_query = new GraphQLObjectType({
    name: 'RootQuerySchema',
    desciption: 'Root query schema',
    fields: () => ({
      activity_query,
      user_account_query,
      portal_counts_query,
      activity_summary_query
    })
  })

  const graphql = {
    schema: new GraphQLSchema({
      query: root_query
    })
  }

  return Object.assign({}, container, { graphql })
}

module.exports = Object.create({connect})
