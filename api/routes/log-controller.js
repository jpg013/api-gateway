const { logLevelSymbols } = require('../config/winston');

exports.postLog = logger => {
  if (!logger) {
    throw new TypeError('logger must be defined.');
  }

  return (req, res, next) => {
    try {
      const { body: msg } = req;
      const logLevel = logger[logLevelSymbols[msg.severity] || logger[logLevelSymbols.debug]];

      if (!logLevel || typeof logLevel !== 'function') {
        throw new Error('Bad request.');
      }

      Reflect.apply(logLevel, undefined, msg);
      next();
    } catch(e) {
      next(e);
    }
  };
};
