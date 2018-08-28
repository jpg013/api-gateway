// process.on('uncaughtException', handleError);
// process.on('unhandledRejection', handleError);

const express             = require('express');
const morgan              = require('morgan');
const helmet              = require('helmet');
const bodyParser          = require('body-parser');
const path                = require('path');
// const api                 = require('./api');
const logger              = require('./common/logger');
const config              = require('./config');
const chalk               = require('chalk');

/**
 * Create Express server.
 */
const app = express();

/**
 *  Express Configuration
 */
app.set('host', config.appHost);
app.set('port', config.appPort);
app.set('environment', config.environment);

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.resolve(config.rootDir, 'public'), { maxAge: 31557600000 }));

/**
 *  Configure and mount the api routes
 */
// app.use('/api', api());

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
  // logger.error(err.message);
  // console.log(err)
};

// process.on('uncaughtException', handleError);
// process.on('unhandledRejection', handleError);
// process.on('SIGINT', logger.error);


module.exports = app;
