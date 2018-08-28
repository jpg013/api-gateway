const path = require('path');
const fs   = require('fs');

module.exports = function extendConfig(config) {
  const logsDir = path.resolve(config.rootDir, 'logs');

  /**
   * Create logs dir if it doesn't exist. This should run once, and only once at startup
   * since it is a blocking operation.
   */
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  return Object.assign({}, { ...config }, {
    development: {
      errorLogPath: path.resolve(logsDir, 'error.log'),
      warnLogPath: path.resolve(logsDir, 'warn.log'),
      infoLogPath: path.resolve(logsDir, 'info.log'),
      exceptionsLogPath: path.resolve(logsDir, 'exceptions.log'),
    },
    testing: {
      errorLogPath: path.resolve(logsDir, 'error.log'),
      warnLogPath: path.resolve(logsDir, 'warn.log'),
      infoLogPath: path.resolve(logsDir, 'info.log'),
      exceptionsLogPath: path.resolve(logsDir, 'exceptions.log'),
    },
    staging: {
      errorLogPath: path.resolve(logsDir, 'error.log'),
      warnLogPath: path.resolve(logsDir, 'warn.log'),
      infoLogPath: path.resolve(logsDir, 'info.log'),
      exceptionsLogPath: path.resolve(logsDir, 'exceptions.log'),
    },
    production: {
      errorLogPath: path.resolve(logsDir, 'error.log'),
      warnLogPath: path.resolve(logsDir, 'warn.log'),
      infoLogPath: path.resolve(logsDir, 'info.log'),
      exceptionsLogPath: path.resolve(logsDir, 'exceptions.log'),
    }
  }[config.environment])
}
