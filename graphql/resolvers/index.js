const { combineResolvers }    = require('graphql-resolvers');
const subjectLocation         = require('./subject-location-resolver');
const newRequestScope         = require('./request-scope-resolver');
const ensureAccessPermissions = require('./ensure-access-permissions-resolver');
const { scalarResolvers }     = require('../scalars');

const rootResolver = combineResolvers(
  newRequestScope,
  ensureAccessPermissions,
);

exports.resolverMap = {
  RootQuery: {
    subject_location: combineResolvers(rootResolver, subjectLocation),
  },
  ...scalarResolvers,
};
