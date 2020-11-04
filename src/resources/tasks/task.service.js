const tasksRepo = require('./task.db.repository');
const { NOT_FOUND } = require('http-status-codes');
const { ErrorInfo } = require('../../helpers/error');

const getAll = async id => tasksRepo.getAll(id);

const get = async (boardId, taskId) => {
  const task = await tasksRepo.get(boardId, taskId);
  if (!task) {
    throw new ErrorInfo(NOT_FOUND, `The task with id: ${taskId} not found`);
  }
  return task;
};

const create = async taskData => tasksRepo.create(taskData);

const update = async (taskId, boardId, taskData) => {
  const task = await tasksRepo.update(taskId, boardId, taskData);
  if (!task) {
    throw new ErrorInfo(NOT_FOUND, `The task with id: ${taskId} not found`);
  }
  return task;
};

const remove = async (boardId, taskId) => {
  const isRemoved = await tasksRepo.remove(boardId, taskId);
  if (!isRemoved) {
    throw new ErrorInfo(NOT_FOUND, `The task with id: ${taskId} not found`);
  }
  return taskId;
};

module.exports = { getAll, get, create, update, remove };
