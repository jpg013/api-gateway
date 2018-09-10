const makeAnalyticsService       = require('./analytics-service');
const makeSubjectLocationService = require('./subject-location-service');
const axios                      = require('axios');
const config                     = require('../config');

/** TODO - Configure this in an appopriate spot.
  * Configure global request args && fetch instances for each service
  */

const newFetchInstance = baseURL => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: { origin: 'https://localhost' } // Without this we receive a 403 from the nginx proxy
  });
};

// /analysis/{analysisId}/subjectLocation

exports.analyticsService = makeAnalyticsService(newFetchInstance(config.services.analytics.baseURL));
exports.subjectLocationService = makeSubjectLocationService(newFetchInstance(config.services.subjectLocation.baseURL));
