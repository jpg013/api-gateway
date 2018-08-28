const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'PortalCountsObject',
  description: 'Influence Portal Counts',
  fields: () => ({
    activity_count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    influencer_count: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
})
