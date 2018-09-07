const { getStatusText } = require('http-status-codes')

class ApiError extends Error {
  constructor (status_code=500, message) {

    // Calling parent constructor of base Error class.
    super(message ||  getStatusText(status_code))

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)

    this.status = status_code
  }
}

module.exports = ApiError
