const request = require('request')
const ApiError = require('../errors/api_error')

function async_request(args={}) {
  return new Promise((resolve, reject) => {
    request(args, (err, res, body) => {
      if (err) {
        return reject(err)
      }

      try {
        if (res.statusCode !== 200) {
          throw new ApiError(res.statusCode, res.statusMessage)
        }

        resolve(JSON.parse(body))
      } catch(e) {
        reject(e)
      }
    })
  })
}

module.exports = async_request
