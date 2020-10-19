const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'silly',
      handleExceptions: false,
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      )
    }),
    new transports.File({
      level: 'silly',
      filename: path.join(__dirname, '../logs/silly.log'),
      handleException: false,
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      ),
      maxsize: 1000000,
      maxFiles: 10,
      colorize: false
    }),
    new transports.File({
      level: 'error',
      filename: path.join(__dirname, '../logs/error.log'),
      handleException: false,
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      ),
      maxsize: 1000000,
      maxFiles: 10,
      colorize: false
    })
  ],
  exitOnError: false
});

module.exports = logger;
