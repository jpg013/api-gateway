const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

// const status = httpStatusCodes[error.message.toUpperCase()] || httpStatusCodes.INTERNAL_SERVER_ERROR;

class InternalServerError extends Error {
  constructor(message) {

    // Calling parent constructor of base Error class.
    super(message || getStatusText(INTERNAL_SERVER_ERROR));

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.status = INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
