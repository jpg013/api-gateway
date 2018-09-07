const { BAD_REQUEST, getStatusText } = require('http-status-codes');

// const status = httpStatusCodes[error.message.toUpperCase()] || httpStatusCodes.INTERNAL_SERVER_ERROR;

class BadRequestError extends Error {
  constructor(message) {

    // Calling parent constructor of base Error class.
    super(message || getStatusText(BAD_REQUEST));

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.status = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
