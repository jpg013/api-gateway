const models = require('../../models');

const DEFAULT_OPTIONS = {
  escapeHtml: true
};

module.exports = function aegis(schemaName='', options) {
  const validatorOpts = Object.assign({}, DEFAULT_OPTIONS, options);

  const middleware = (req, res, next) => {
    try {
      const { value, error } = models.validate(req.body, schemaName, validatorOpts);

      if (error) {
        throw new Error(error);
      }

      const descriptor = Object.getOwnPropertyDescriptor(req, 'body');
      /* istanbul ignore next */
      if (descriptor && descriptor.writable) {
        req.body = value;
      } else {
        Object.defineProperty(req, 'body', {
          get() { return value; },
        });
      }

      req.body = value;
      next();
    } catch(e) {
      next(e);
    }
  };

  return middleware;
};
