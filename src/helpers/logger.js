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
      body: JSON.stringify(req.body)
    };
    winston.info(log);
  }
};

module.exports = logger;
