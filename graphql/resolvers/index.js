const { combineResolvers }    = require('graphql-resolvers');
const subjectLocation         = require('./subject-location');
const newRequestScope         = require('./request-scope');
const ensureAccessPermissions = require('./ensure-access-permissions');
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
