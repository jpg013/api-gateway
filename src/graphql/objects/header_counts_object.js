const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLString
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'SummaryCounts',
  description: 'Summary Counts',
  fields: () => ({
    influencer_count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    post_trend: {
      type: new GraphQLNonNull(GraphQLString)
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
