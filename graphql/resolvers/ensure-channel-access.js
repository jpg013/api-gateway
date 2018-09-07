const { analyticsService } = require('../../services');
const { UnauthorizedError } = require('../../errors');

module.exports = async function ensureChannelAccess(obj, args, context) {
  try {

    /**
     * Validate request has correct access permission
     */

    const { filter: { activityId } } = args;

    if (!activityId) {
      return;
    }

    await analyticsService.getChannelAccess(activityId, context.bearerToken);
  } catch(e) {
    throw new UnauthorizedError();
  }
};
