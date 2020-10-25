const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { OK, NOT_FOUND } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.get(req.params.id);
    if (user) {
      res.status(OK).json(User.toResponse(user));
    } else {
      res.status(NOT_FOUND).send(`The user with ${req.params.id} not found`);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.create(
      new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      })
    );
    res.json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    const isRemoved = await usersService.remove(req.params.id);
    if (isRemoved) {
      res.status(OK).json(`The user with ${id} has been deleted`);
    } else res.status(NOT_FOUND).json(`The user with ${id} not found`);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
