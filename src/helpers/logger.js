const winston = require('../common/winston.config');

const logger = (req, err) => {
  if (err) {
    const errorLog = {
      message: err.message,
      statusCode: err.statusCode
    };
    if (req) {
      errorLog.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    }
    winston.error(errorLog);
  } else {
    const log = {
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      method: req.method,
      params: JSON.stringify(req.query),
      body: JSON.stringify(toSecurityLog(req.body))
    };
    winston.info(log);
  }
};

const toSecurityLog = body => {
  if (body.password) {
    return { ...body, password: 'secret information' };
  }
  return body;
};

module.exports = logger;
