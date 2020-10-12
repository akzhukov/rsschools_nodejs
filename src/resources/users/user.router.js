const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(
    User.fromRequest({ ...req.body, id: req.params.id })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  await usersService.remove(req.params.id);
  res.json(`The user with id: ${id} was deleted`);
});

module.exports = router;
