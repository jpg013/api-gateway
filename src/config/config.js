const fs = require('fs')
const path = require('path')
const app_dir = path.normalize(`${__dirname}/../`)
const { version, build_number } = JSON.parse(fs.readFileSync(path.normalize(`${__dirname}/../../package.json`), { encoding: 'utf8'}))

const server_settings = {
  port: process.env.SERVER_PORT || 9000,
  version,
  build_number
}

const path_settings = {
  config_dir_path: path.resolve(app_dir, 'config'),
  public_file_path: path.resolve(app_dir, 'public')
}

const proxy_env = {
  influence: {
    'development': 'https://api.dev.dunami.com/influence/v1',
    'production': 'https://api.dunami.com/influence/v1',
    'test': 'http://api.test.dunami.com/influence/v1',
    'qa': 'https://api.qa.dunami.com/influence/v1'
  },
  analytics: {
    'development': 'https://api.dev.dunami.com/analytics/v1',
    'production': 'https://api.dunami.com/analytics/v1',
    'test': 'http://api.test.dunami.com/analytics/v1',
    'qa': 'https://api.qa.dunami.com/analytics/v1'
  }
}

const api_prefix = {
  influence: proxy_env.influence[process.env.NODE_ENV] || proxy_env.influence.test,
  analytics: proxy_env.analytics[process.env.NODE_ENV] || proxy_env.analytics.test,
}

module.exports = Object.assign({}, {
  server_settings,
  path_settings,
  api_prefix
})
