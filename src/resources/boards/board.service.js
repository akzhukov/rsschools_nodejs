const boardRepo = require('./board.db.repository');

const getAll = () => boardRepo.getAll();

const get = id => boardRepo.get(id);

const create = board => boardRepo.create(board);

const update = (id, boardData) => boardRepo.update(id, boardData);

const remove = id => boardRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
