const express = require('express');
const cors = require('cors');
require('express-async-errors');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const authRouter = require('./resources/authentication/auth.router');
const checkToken = require('./helpers/checkToken');
const logger = require('./helpers/logger');
const { finished } = require('stream');
const { handleError } = require('./helpers/error');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const app = express();
app.use(cors());
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
  finished(res, () => logger(req));
  next();
});

app.use('/login', authRouter);
// app.use('/users', checkToken, userRouter);
// app.use('/boards', checkToken, boardRouter);
// boardRouter.use('/:boardId/tasks', checkToken, taskRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

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
