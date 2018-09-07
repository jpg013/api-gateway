const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

/**
 * Error handler
 */
module.exports = function errorHandler(err, req, res, next) {
  req.error = {
    message: err.message,
    status: err.status,
    statusText: getStatusText(err.status || INTERNAL_SERVER_ERROR),
  };

  next();
};
