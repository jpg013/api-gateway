const { combineResolvers }    = require('graphql-resolvers');
const subjectLocation         = require('./subject-location');
const requestScope            = require('./request-scope');
const ensureAccessPermissions = require('./ensure-access-permissions');
const ensureChannelAccess     = require('./ensure-channel-access');

exports.resolverMap = {
  RootQuery: {
    subject_location: combineResolvers(
      requestScope,
      ensureAccessPermissions,
      ensureChannelAccess,
      subjectLocation
    )
  }
};
