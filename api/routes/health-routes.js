const { OK } = require('http-status-codes');

exports.getHealth = function getHealth(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Config must be defined.');
  }
  
  const {
    environment,
    buildNumber,
    version,
  } = config;

  return (req, res) => {
    res.status(OK).send({
      environment,
      buildNumber,
      version,
      status: OK,
      application_name: config.name,
      application_description: config.description,
    });
  };
};
