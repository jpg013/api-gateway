const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
}                     = require('graphql')
const GraphQLDateTime = require('../scalars/date_time_scalar')

module.exports = new GraphQLObjectType({
  name: 'SentimentObject',
  description: 'Sentiment counts for time period',
  fields: () => ({
    positive_count: {
      type: GraphQLInt
    },
    negative_count: {
      type: GraphQLInt
    },
    neutral_count: {
      type: GraphQLInt
    },
    unknown_count: {
      type: GraphQLInt
    }
  })
})
