const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = async () => User.find({});

const get = async id => User.findById(id);

const create = async user => User.create(user);

const update = async (id, userData) => User.updateOne({ _id: id }, userData);

const remove = async id => {
  await Task.updateMany({ userId: id }, { userId: null });
  return (await User.deleteOne({ _id: id })).ok;
};

module.exports = { getAll, get, create, update, remove };
