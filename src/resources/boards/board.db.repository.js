const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = async () => Board.find({});

const get = async id => Board.findById(id);

const create = async data => Board.create(data);

const update = async (id, data) => Board.update({ _id: id }, data);

const remove = async id => {
  await Task.deleteMany({ boardId: id });
  return (await Board.deleteOne({ _id: id })).ok;
};

module.exports = { getAll, get, create, update, remove };
