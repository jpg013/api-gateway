const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLFloat
} = require('graphql')

const header_counts_object = require('./header_counts_object')
const sentiment_object     = require('./sentiment_object')

module.exports = new GraphQLObjectType({
  name: 'ActivityFeedSummary',
  description: 'Activity Feed Summary',
  fields: () => ({
    influencer_count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    post_count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    person_percent: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    organization_percent: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    uncategorized_percent: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    bot_percent: {
      type: new GraphQLNonNull(GraphQLFloat)
    }
  })
})
