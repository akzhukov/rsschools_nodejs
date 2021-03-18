const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { OK } = require('http-status-codes');

router.route('/').get(async (req, res) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const filter = req.query.filter;
  const users = await usersService.getAll(skip, limit, filter);
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id); 
  res.status(OK).json(user);
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(OK).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.status(OK).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await usersService.remove(id);
  res.status(OK).json({ id });
});

module.exports = router;
