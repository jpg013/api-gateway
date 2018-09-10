const { ApiError } = require('../errors');

function makeService(fetch) {
  if (!fetch) {
    throw new TypeError('fetch must be defined.');
  }

  // TODO - This needs to be refactoed when we get the actual service
  const getSubjectLocations = async (params, authToken) => {
    // Call to subject location service will go here, using fake data for now.
    try {
      const options = {
        method: 'POST',
        headers: { auth: authToken },
        data: { ...params },
        url: `/${params.activityId}/subjectLocation`,
      };

      const { data } = await fetch(options);

      return data;
    } catch({ response }) {
      throw new ApiError(response.status, response.data.message);
    }
  };

  return {
    getSubjectLocations,
  };
}

/**
 * Factory function that builds and returns the analytics service api
 */

module.exports = function subjectLocationService(fetch) {
  return makeService(fetch);
};
