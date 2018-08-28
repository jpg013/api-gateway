const { createLogger, format, transports } = require('winston');
const { environment, rootDir }             = require('../config');
const fs                                   = require('fs');
const config                               = require('../config');
const compose                              = require('../utils/compose');

const { combine, timestamp, json } = format;

/**
 * Log Fields
 */

const logFields = {
  timestamp: 'timestamp',
  component: 'component',
  tags: 'tags',
  version: 'version',
  message: 'message',
  severity: 'severity',
  stackTrace: 'stackTrace',
};

/**
 * Level symbol for formating by filter level
 */
const LEVEL_SYMBOL = Symbol.for('level');
const MESSAGE_SYMBOL = Symbol.for('message');

/**
 * Log only the messages the match `level`.
 */
const filterLevel = level => {
  return format(info => {
    // Match on the level
    if (info[LEVEL_SYMBOL] === level) {
      return info;
    }
  })();
};

/**
 * Log only the specified fields
 */
const withFields = (fields) => {
  return format(info => {
    const val = Object.entries(fields)
      .reduce((acc, [key, val]) => {
        return (typeof info[val] !== 'undefined') ? Object.assign({}, { ...acc }, {
          [key]: info[val]
        }) : acc;
      }, {});

    val.severity = info[LEVEL_SYMBOL];
    val[LEVEL_SYMBOL] = info[LEVEL_SYMBOL];
    val[MESSAGE_SYMBOL] = info[MESSAGE_SYMBOL];

    return val
  })();
}

const logger = createLogger({
  exitOnError: false,
  exceptionHandlers: [
    new transports.File({ filename: config.exceptionsLogPath })
  ],
  format: combine(
    timestamp(),
    json(),
  ),
  transports: [
    new transports.File({
      format: combine(filterLevel('info'), withFields(logFields)),
      level: 'info',
      filename: config.infoLogPath,
      maxsize: 5242880, //5MB
    }),
    new transports.File({
      format: combine(filterLevel('warn'), withFields(logFields)),
      level: 'warn',
      filename: config.warnLogPath,
      maxsize: 5242880, //5MB
    }),
    new transports.File({
      format: combine(filterLevel('error'), withFields(logFields)),
      level: 'error',
      filename: config.errorLogPath,
      maxsize: 5242880, //5MB
    })
  ]
});

if (environment !== 'production') {
  logger.add(new transports.Console({ level: 'silly' }));
}

/**
 * Expose a logger inteface that wraps our logger
 */
const loggerInterface = {
  debug: msg => logger.debug(msg),
  info: msg => logger.info(msg),
  warn: msg => logger.warn(msg),
  error: msg => logger.error(msg),
}

module.exports = loggerInterface;
