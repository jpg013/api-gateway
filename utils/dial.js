
const { isDateObject } = require('../date');
const SIMPLE_QUERY_PARAM_TYPES = ['string', 'number', 'boolean'];
const makeQueryParamKeyVal = (k, v) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;

// Filter out any complex query params, e.g. objects/arrays of object.
function filterComplexQueryParams(kv) {
  if (SIMPLE_QUERY_PARAM_TYPES.includes(typeof kv[1])) {
    return true;
  }

  // In the future we will have all date types converted to ISO string before
  // calling api, but we're not there yet.
  if (isDateObject(kv[1])) {
    return true;
  }

  if (Array.isArray(kv[1])) {
    return !kv[1].find(cur => !SIMPLE_QUERY_PARAM_TYPES.includes(typeof cur));
  }

  return false;
}

const walkQueryParams = (params={}) => {
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

function makeUrl(endpoint, method, params={}) {
  const url = endpoint;

  if (method === 'get' && params && Object.keys(params).length) {
    return `${url}?${walkQueryParams(params)}`;
  }

  return url;
}

async function dial(endpoint, method='get', options={}) {
  if (typeof method === 'object') {
    options = method;
    method = 'get';
  }

  const headers = Object.assign({}, { 'content-type': 'application/json' }, { ...options.headers || {} })

  const requestArgs = Object.assign({}, {
    headers,
    url: makeUrl(endpoint, method, options.params),
    method
  })

  if (method !== 'get') {
    request_args['json'] = options.params
  }

  return await async_request(request_args)
}

module.exports = dial
