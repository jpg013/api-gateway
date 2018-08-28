const path   = require('path');
const dotenv = require('dotenv');
const fs     = require('fs');

/**
 * Load config files
 */

const configExtensions = [
  require('./app-config'),
  require('./logger-config'),
  require('./services-config')
]

/**
 * Load any config variables
 */
dotenv.config();

/**
  * Node Environment Enum
  */
const NODE_ENV_ENUM = ['development', 'testing', 'staging', 'production'];

/**
  * Validate the env NODE_ENV
  */
const environment = (function() {
  if (['development', 'testing', 'staging', 'production'].indexOf(process.env.NODE_ENV) < 0) {
    return 'development';
  }

  return process.env.NODE_ENV;
})()

/**
  * Set the application root directory
  */
const rootDir = path.resolve(__dirname, '../');

/**
  * Load the Package json
  */
const npmPackage = JSON.parse(fs.readFileSync(path.resolve(rootDir, 'package.json')), { encoding: 'utf8' });

const baseConfig = {
  version: npmPackage.version,
  buildNumber: npmPackage.build_number,
  name: npmPackage.name,
  description: npmPackage.description,
  environment,
  rootDir
}

module.exports = configExtensions.reduce((acc, curr) => curr(acc), baseConfig)
