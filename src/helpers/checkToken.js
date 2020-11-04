const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { ErrorInfo } = require('../helpers/error');
const { UNAUTHORIZED } = require('http-status-codes');

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new ErrorInfo(UNAUTHORIZED, 'Unauthorized user!');
    } else {
      jwt.verify(token, JWT_SECRET_KEY, err => {
        if (err) {
          throw new ErrorInfo(UNAUTHORIZED, 'Unauthorized user!');
        }
      });
      return next();
    }
  }

  throw new ErrorInfo(UNAUTHORIZED, 'Unauthorized user!');
};

module.exports = checkToken;
