const { analyticsService }  = require('../../services');
const { UnauthorizedError } = require('../../errors');
const models                = require('../../models');

const validateAccessPermission = models.validate.bind(undefined, 'accessControls');

module.exports = async function ensureAccessPermissions(obj, args, context) {
  /**
   * Validate request has correct access permission
   */
  validateAccessPermission(context.requestScope.permissions);

  const { filter: { activityId } } = args;

  if (!activityId) {
    return;
  }

  const hasChannelAccess = await analyticsService.validateRequestHasChannelAccess(activityId, context.bearerToken);

  if (!hasChannelAccess) {
    throw new UnauthorizedError(`Request does not have access to channel activity - ${activityId}`);
  }
};
