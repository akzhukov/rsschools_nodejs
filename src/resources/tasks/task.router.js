const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const { OK, NOT_FOUND } = require('http-status-codes');

router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    if (task) {
      res.status(OK).json(Task.toResponse(task));
    } else {
      res
        .status(NOT_FOUND)
        .json(`The task with ${req.params.taskId} not found`);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await tasksService.create(
      new Task({
        title,
        order,
        description,
        boardId,
        userId,
        columnId
      })
    );
    res.json(Task.toResponse(task));
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  try {
    const task = await tasksService.update(
      req.params.taskId,
      req.params.boardId,
      req.body
    );
    res.json(Task.toResponse(task));
  } catch (err) {
    return next(err);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  try {
    const id = req.params.taskId;
    const isRemoved = await tasksService.remove(
      req.params.boardId,
      req.params.taskId
    );
    if (isRemoved) {
      res.status(OK).json(`The task with ${id} has been deleted`);
    } else {
      res.status(NOT_FOUND).json(`The task with ${id} not found`);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
