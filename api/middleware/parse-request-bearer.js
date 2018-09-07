const parseRequestBearer = (req, res, next) => {
  try {
    const auth = req.headers['authorization'] || req.headers['Authorization'];

    if (typeof auth !== 'string' || !auth.trim().length) {
      return next();
    }

    const tokens = auth.trim().split(' ');

    if (tokens.length !== 2 || tokens[0] !== 'Bearer') {
      return next();
    }

    req.bearerToken = tokens[1];
    next();
  } catch(e) {
    next(e);
  }
};

module.exports = parseRequestBearer;
