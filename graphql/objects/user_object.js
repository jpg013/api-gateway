const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'User Object',
  fields: () => ({
    user_name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    first_name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    last_name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    email: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    }
  })
})
