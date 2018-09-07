const appConfig = {
  development: {
    port: 8080,
    host: '0.0.0.0',
  },
  testing: {
    port: 8080,
    host: '0.0.0.0',
  },
  staging: {
    port: 8080,
    host: '0.0.0.0',
  },
  production: {
    port: 8080,
    host: '0.0.0.0',
  }
};

/**
  * Extend the appConfig for env
  */
module.exports = function extendConfig(config) {
  return Object.assign({}, { ...config }, {
    app: appConfig[config.environment]
  });
};
