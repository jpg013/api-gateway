const path = require('path');

module.exports = function extendConfig(config) {
  return Object.assign({}, { ...config }, {
    development: {
      influence: "https://api.dev.dunami.com/influence/v1",
      analytics: "https://api.dev.dunami.com/analytics/v1"
    },
    testing: {
      influence: "https://api.dev.dunami.com/influence/v1",
      analytics: "https://api.dev.dunami.com/analytics/v1"
    },
    staging: {
      influence: "https://api.dev.dunami.com/influence/v1",
      analytics: "https://api.dev.dunami.com/analytics/v1"
    },
    production: {
      influence: "https://api.dev.dunami.com/influence/v1",
      analytics: "https://api.dev.dunami.com/analytics/v1"
    }
  }[config.environment]);
}
