const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = (id, userData) => usersRepo.update(id, userData);

const remove = id => usersRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
