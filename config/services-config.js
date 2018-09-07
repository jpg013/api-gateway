const servicesConfig = {
  development: {
    influence: {
      baseURL: 'https://api.dev.dunami.com/influence/v1',
    },
    analytics: {
      baseURL: 'https://api.dev.dunami.com/analytics/v1'
    },
  },
  testing: {
    influence: {
      baseURL: 'https://api.dev.dunami.com/influence/v1',
    },
    analytics: {
      baseURL: 'https://api.dev.dunami.com/analytics/v1'
    },
  },
  staging: {
    influence: {
      baseURL: 'https://api.dev.dunami.com/influence/v1',
    },
    analytics: {
      baseURL: 'https://api.dev.dunami.com/analytics/v1'
    },
  },
  production: {
    influence: {
      baseURL: 'https://api.dunami.com/influence/v1',
    },
    analytics: {
      baseURL: 'https://api.dunami.com/analytics/v1'
    },
  }
};

module.exports = function extendConfig(config) {
  return Object.assign({}, { ...config }, {
    services: servicesConfig[config.environment]
  });
};
