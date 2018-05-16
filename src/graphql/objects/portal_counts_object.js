const { GraphQLInt } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'PortalCountsObject',
  description: 'Portal COunts',
  fields: () => ({
    activity_count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    influencer_count: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
})
