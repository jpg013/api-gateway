function makeService(fetch) {
  if (!fetch) {
    throw new TypeError('fetch must be defined.');
  }

  // TODO - This needs to be refactoed when we get the actual service
  const getSubjectLocations = async (params) => {
    console.log('getting here...')
    return null;
    // Call to subject location service will go here, using fake data for now.
    const uri = `/${params.activityId}/subjectLocation`;

    const result = fetch.post(uri, params);

    console.log(result);
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
