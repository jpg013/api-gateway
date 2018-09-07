const joi = require('joi');

const models = Object.create({
  accessControls: require('./access-controls-model')(joi)
});

const validator = (type, object) => {
  if (!object) {
    throw new Error('Object to validate not provided.');
  }

  if (!type) {
    throw new Error('Schema type to validate not provided.');
  }

  const validator = models[type] && models[type].validate.bind(null, object);

  if (!validator) {
    throw new Error('Invalid validator.');
  }

  return validator(joi);
};

module.exports = Object.create({ validate: validator, });
