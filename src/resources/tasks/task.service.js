const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);

const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);

const create = task => tasksRepo.create(task);

const update = task => tasksRepo.update(task);

const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
