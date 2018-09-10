const { analyticsService } = require('../../services');

module.exports = async function newRequestScope(obj, args, context, info) {
  try {
    const account = await analyticsService.getRequestCtxAccount(context.bearerToken);
    context.requestScope = {
      account,
      permissions: {
        [info.fieldName]: {
          hasInfluenceAccess: account.hasInfluenceAccess,
          isSysAdmin: account.isSysAdmin,
          hasProAccess: account.hasProAccess,
        },
      }
    };
  } catch(e) {
    // TODO - Error Handling
  }
};
