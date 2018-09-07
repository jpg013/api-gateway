const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const activityQuery                        = require('./queries/activity-query');

const rootQuery = new GraphQLObjectType({
  name: 'RootQuerySchema',
  desciption: 'Root query schema',
  fields: () => ({
    activity: activityQuery(),
  })
});

const graphql = {
  schema: new GraphQLSchema({
    query: rootQuery
  })
};

module.exports = graphql;
