function extract_proxy_headers(req, res, next) {
  const { headers : {
    'content-type': content_type,
    accept,
    'accept-encoding': accept_encoding,
    authorization,
    'accept-language': accept_language
  }} = req

  const proxy_headers = {
    accept,
    'content-type': content_type,
    'accept-encoding': accept_encoding,
    'accept-language': accept_language
  }

  const bearer_token = authorization && authorization.split('Bearer')

  if (bearer_token && bearer_token.length > 1) {
    const auth_token = bearer_token[1].trim()

    proxy_headers['auth'] = auth_token
  }

  req.proxy_headers = proxy_headers

  next()
}

module.exports = {
  extract_proxy_headers
}
