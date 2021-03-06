const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const { OK } = require('http-status-codes');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(OK).json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await tasksService.get(req.params.boardId, req.params.taskId);
  res.status(OK).json(Task.toResponse(task));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const task = await tasksService.create({
    title,
    order,
    description,
    boardId,
    userId,
    columnId
  });
  res.status(OK).json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { taskId, boardId } = req.params;
  const task = await tasksService.update(taskId, boardId, req.body);
  res.status(OK).json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { taskId, boardId } = req.params;
  await tasksService.remove(boardId, taskId);
  res.status(OK).json({ taskId });
});

module.exports = router;
