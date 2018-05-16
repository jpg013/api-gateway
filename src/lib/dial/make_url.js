const { isDateObject } = require('../date');
const SIMPLE_QUERY_PARAM_TYPES = ['string', 'number', 'boolean'];
const make_query_param_key_val = (k, v) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;

// Filter out any complex query params, e.g. objects/arrays of object.
function filter_complex_query_params([key, val]) {
  if (SIMPLE_QUERY_PARAM_TYPES.includes(typeof val)) {
    return true;
  }

  // In the future we will have all date types converted to ISO string before
  // calling api, but we're not there yet.
  if (isDateObject(val)) {
    return true;
  }

  if (Array.isArray(val)) {
    return !val.find(cur => !SIMPLE_QUERY_PARAM_TYPES.includes(typeof cur));
  }

  return false;
}

const build_query_params = (params={}) => {
  return Object.entries(params)
    .filter(filter_complex_query_params)
    .map(([k,v]) => {
      if (Array.isArray(v)) {
        return v.map(cur => make_query_param_key_val(k, cur)).join('&');
      } else {
        return make_query_param_key_val(k, v);
      }
    })
    .join('&');
};

module.exports = function make_url(endpoint, method, params={}) {
  const url = endpoint

  if (method === 'get' && params && Object.keys(params).length) {
    return `${url}?${build_query_params(params)}`;
  }

  return url;
};
