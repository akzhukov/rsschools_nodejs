const tasksRepo = require('./task.db.repository');

const getAll = id => tasksRepo.getAll(id);

const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);

const create = task => tasksRepo.create(task);

const update = (taskId, boardId, taskData) =>
  tasksRepo.update(taskId, boardId, taskData);

const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
