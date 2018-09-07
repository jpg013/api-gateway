const {
  GraphQLList,
  GraphQLInt
}                          = require('graphql');
const activityObject = require('../objects/activity-object');
// const DependencyError      = require('../../errors/dependency_error')

/*
const default_query_args = {
  first: 1000,
  offset: 0
}
*/

module.exports = function activityQuery() {
  async function query_resolver(/*parent, args, req*/) {
    // Proxy options
    // const options = {
    // headers: { ...req.proxy_headers }
    // }

    // const result = await activity_repository.get_activity(options)
    // const start = args.offset || default_query_args.offset
    // const end = start + (args.first || default_query_args.first)

    // return result.slice(start, end)

    return [
      {
        id: 1,
        name: 'Name of activity',
        description: 'lovely little description',
        created_date: new Date()
      }
    ];
  }

  return {
    type: new GraphQLList(activityObject),
    description: 'Activity feeds query',
    resolve: query_resolver,
    args: {
      first: { type: GraphQLInt, default: 20 },
      offset: { type: GraphQLInt }
    }
  };
};
