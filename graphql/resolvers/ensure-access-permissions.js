// const { analyticsService } = require('../../services');
const { UnauthorizedError } = require('../../errors');
const models = require('../../models');

module.exports = async function ensureAccessPermissions(obj, args, context) {
  try {
    /**
     * Validate request has correct access permission
     */

    models.validate('accessControls', context.requestScope.permissions);
  } catch(e) {
    throw new UnauthorizedError();
  }
};
