const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = async () => User.find({});

const get = async id => User.findById(id);

const getByLogin = async login => User.findOne({ login });

const create = async data => User.create(data);

const update = async (id, data) => User.updateOne({ _id: id }, data);

const remove = async id => {
  await Task.updateMany({ userId: id }, { userId: null });
  return (await User.deleteOne({ _id: id })).ok;
};

module.exports = {
  getAll,
  get,
  getByLogin,
  create,
  update,
  remove
};
