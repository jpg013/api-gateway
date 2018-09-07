const {
  SubjectLocationType,
  FilterInput
}                              = require('./types');
const { resolverMap }          = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');

const RootQuery = `
  type RootQuery {
    subject_location(filter: FilterInput): SubjectLocation
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    FilterInput,
    ...SubjectLocationType,
  ],
  resolvers: resolverMap
});
