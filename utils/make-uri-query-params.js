const { isDateObject } = require('../date');
const SIMPLE_QUERY_PARAM_TYPES = ['string', 'number', 'boolean'];
const makeQueryParamKeyVal = (k, v) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;

// Filter out any complex query params, e.g. objects/arrays of object.
function filterComplexQueryParams(curr) {
  if (SIMPLE_QUERY_PARAM_TYPES.includes(typeof val)) {
    return true;
  }

  // In the future we will have all date types converted to ISO string before
  // calling api, but we're not there yet.
  if (isDateObject(curr[1])) {
    return true;
  }

  if (Array.isArray(curr[1])) {
    return !curr[1].find(cur => !SIMPLE_QUERY_PARAM_TYPES.includes(typeof cur));
  }

  return false;
}

const walkParams = (params={}) => {
  return Object.entries(params)
    .filter(filterComplexQueryParams)
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        return v.map(cur => makeQueryParamKeyVal(k, cur)).join('&');
      } else {
        return makeQueryParamKeyVal(k, v);
      }
    })
    .join('&');
};

module.exports = function makeUrlQueryParams(endpoint, method, params={}) {
  const url = endpoint;

  if (method === 'get' && params && Object.keys(params).length) {
    return `${url}?${walkParams(params)}`;
  }

  return url;
};
