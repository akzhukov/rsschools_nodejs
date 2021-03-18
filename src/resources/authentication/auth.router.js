const router = require('express').Router();
const authService = require('./auth.service');
const { ErrorInfo } = require('../../helpers/error');
const { FORBIDDEN, OK } = require('http-status-codes');

router.route('/').post(async (req, res, next) => {
  const { login, password } = req.body;

  const token = await authService.signToken(login, password);
  if (!token) {
    return next(new ErrorInfo(FORBIDDEN, 'Wrong login/password combination!')); // нет токена
  }
  res.status(OK).json({ token });
});

module.exports = router;
