const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
}                     = require('graphql')
const GraphQLDateTime = require('../scalars/date_time_scalar')

module.exports = new GraphQLObjectType({
  name: 'ActivityFeed',
  description: 'Activity Feed',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    created_date: {
      type: GraphQLDateTime
    }
  })
})
