const { UNAUTHORIZED, getStatusText } = require('http-status-codes');

// const status = httpStatusCodes[error.message.toUpperCase()] || httpStatusCodes.INTERNAL_SERVER_ERROR;

class UnauthorizedError extends Error {
  constructor(message) {

    // Calling parent constructor of base Error class.
    super(message || getStatusText(UNAUTHORIZED));

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.status = UNAUTHORIZED;
    this.statusText = getStatusText(UNAUTHORIZED);
  }
}

module.exports = UnauthorizedError;
