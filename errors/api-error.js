const httpStatusCodes = require('http-status-codes');

const { INTERNAL_SERVER_ERROR, getStatusText } = httpStatusCodes;

class ApiError extends Error {
  constructor (status=INTERNAL_SERVER_ERROR, message) {
    let statusText;

    try {
      statusText = getStatusText(status);
    } catch(e) {
      status = INTERNAL_SERVER_ERROR;
      statusText = getStatusText(INTERNAL_SERVER_ERROR);
    }

    // Calling parent constructor of base Error class.
    super(message || statusText);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.status = status;
    this.statusText = statusText;
  }
}

module.exports = ApiError;
