const path      = require('path');
const fs        = require('fs');

/**
  * Extend the appConfig for env
  */
module.exports = function extendConfig(config) {
  return Object.assign({}, { ...config }, {
    development: {
      appPort: 8080,
      appHost: "0.0.0.0",
    },
    testing: {
      appPort: 8080,
      appHost: "0.0.0.0",
    },
    staging: {
      appPort: 8080,
      appHost: "0.0.0.0",
    },
    production: {
      appPort: 8080,
      appHost: "0.0.0.0",
    }
  }[config.environment]);
}
