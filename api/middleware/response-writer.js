const { OK, getStatusText } = require('http-status-codes');

/**
 * http response writer
 */
module.exports = function responseWriter(req, res) {
  if (req.error) {
    res.status(req.error.status).send(req.error);
    return;
  }

  res.status(OK).send({
    status: OK,
    status_message: getStatusText(OK),
    results: req.results
  });
};
