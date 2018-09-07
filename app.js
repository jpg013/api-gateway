const express              = require('express');
const morgan               = require('morgan');
const helmet               = require('helmet');
const bodyParser           = require('body-parser');
const path                 = require('path');
const api                  = require('./api');
// const logger            = require('./common/logger');
const config               = require('./config');
const chalk                = require('chalk');
const expressStatusMonitor = require('express-status-monitor');

process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

/**
 * Create Express server.
 */
const app = express();

/**
 *  Express Configuration
 */
app.set('host', config.app.host);
app.set('port', config.app.port);
app.set('environment', config.environment);

/**
 *  Express status monitor uses web sockets that will not work in our AWS environment yet.
 */
if (config.environment === 'development') {
  app.use(expressStatusMonitor());
}

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 *  Configure and mount the api routes
 */
api(app);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  /* eslint-disable-next-line  */
  console.log(`${chalk.green('✓')} App is running at ${app.get('host')}:${app.get('port')} in ${app.get('env')} mode`);
  /* eslint-disable-next-line  */
  console.log('Press CTRL-C to stop\n');
});

/**
 * handle error events
 */
function handleError(err) {
  console.log(err)
}

module.exports = app;
