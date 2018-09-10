const {
  SubjectLocationType,
  FilterInputType
}                              = require('./types');
const { resolverMap }          = require('./resolvers');
const { scalarTypes }          = require('./scalars');
const { makeExecutableSchema } = require('graphql-tools');

const RootQuery = `
  type RootQuery {
    subject_location(filter: FilterInput): [SubjectLocation]
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
    FilterInputType,
    ...SubjectLocationType,
    ...scalarTypes
  ],
  resolvers: resolverMap
});
