const { analyticsService } = require('../../services');

module.exports = async function newRequestScope(obj, args, context, info) {
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
};
