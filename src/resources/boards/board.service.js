const boardRepo = require('./board.db.repository');
const { NOT_FOUND } = require('http-status-codes');
const { ErrorInfo } = require('../../helpers/error');

const getAll = async () => boardRepo.getAll();

const get = async id => {
  const board = await boardRepo.get(id);
  if (!board) {
    throw new ErrorInfo(NOT_FOUND, `The board with id: ${id} not found`);
  }
  return board;
};

const create = async data => boardRepo.create(data);

const update = async (id, data) => {
  const board = await boardRepo.update(id, data);
  if (!board) {
    throw new ErrorInfo(NOT_FOUND, `The board with id: ${id} not found`);
  }
  return board;
};

const remove = async id => {
  const isRemoved = await boardRepo.remove(id);
  if (!isRemoved) {
    throw new ErrorInfo(NOT_FOUND, `The board with id: ${id} not found`);
  }
  return id;
};

module.exports = { getAll, get, create, update, remove };
