const async_request  = require('../async_request')
const make_url       = require('./make_url')

async function dial(endpoint, method, options={}) {
  const headers = Object.assign({}, { 'content-type': 'application/json' }, { ...options.headers || {} })

  const request_args = Object.assign({}, {
    headers,
    url: make_url(endpoint, method, options.params),
    method
  })

  if (method !== 'get') {
    request_args['json'] = options.params
  }

  return await async_request(request_args)
}

module.exports = dial
