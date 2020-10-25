const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = async () => Board.find({});

const get = async id => Board.findById(id);

const create = async board => Board.create(board);

const update = async (id, boardData) => Board.update({ _id: id }, boardData);

const remove = async id => {
  await Task.deleteMany({ boardId: id });
  return (await Board.deleteOne({ _id: id })).ok;
};

module.exports = { getAll, get, create, update, remove };
