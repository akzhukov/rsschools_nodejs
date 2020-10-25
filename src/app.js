const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./helpers/logger');
const { finished } = require('stream');
const { handleError } = require('./helpers/error');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
  finished(res, () => logger(req));
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
  logger(req, err);
  next();
});

process
  .on('uncaughtException', err => {
    const error = {
      statusCode: INTERNAL_SERVER_ERROR,
      message: `Uncaught Exception: ${err.message}`
    };
    logger(null, error);
  })
  .on('unhandledRejection', err => {
    const error = {
      statusCode: INTERNAL_SERVER_ERROR,
      message: `Unhandled Rejection: ${err.message}`
    };
    logger(null, error);
  });

module.exports = app;
