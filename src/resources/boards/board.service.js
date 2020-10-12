const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const get = id => boardRepo.get(id);

const create = board => boardRepo.create(board);

const update = board => boardRepo.update(board);

const remove = id => boardRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
