function makeService(fetch) {
  if (!fetch) {
    throw new TypeError('fetch must be defined.');
  }
  // GET /analysis/GetAnalysisSummaryData
  const validateRequestHasChannelAccess = async (id, token) => {
    const resp = await fetch.get(`/analysis/GetAnalysisSummaryData/?analysisKeys=${id}`, {

      headers: {
        auth: token
      }
    });

    if (resp.status !== 200) {
      throw new Error('Unauthorized');
    }

    return true;
  };

  const getRequestCtxAccount = async token => {
    const resp = await fetch.get('/user/getMyAccount', {
      headers: {
        auth: token
      }
    });

    return resp.data;
  };

  return {
    getRequestCtxAccount,
    validateRequestHasChannelAccess,
  };
}

/**
 * Factory function that builds and returns the analytics service api
 */

module.exports = function analyticsService(fetch) {
  return makeService(fetch);
};
