const Task = require('./task.model');

const getAll = async id => Task.find({ boardId: id });

const get = async (boardId, taskId) => Task.findById(taskId);

const create = async task => Task.create(task);

const update = async (taskId, boardId, taskData) =>
  Task.updateOne({ _id: taskId }, taskData);

const remove = async (boardId, taskId) => {
  return (await Task.deleteOne({ _id: taskId })).ok;
};

module.exports = { getAll, get, create, update, remove };
