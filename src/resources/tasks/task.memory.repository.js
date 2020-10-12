const DB = require('../../common/inMemoryDB');

const getAll = async id => DB.getTasksByBoardId(id);

const get = async (boardId, taskId) => {
  const task = await DB.getTaskByBoardIdAndTaskId(boardId, taskId);

  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }
  return task;
};

const create = async task => DB.createTask(task);

const update = async task => DB.updateTask(task);

const remove = async (boardId, taskId) => DB.removeTask(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
