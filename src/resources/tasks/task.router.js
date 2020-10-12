const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await tasksService.create(
    Task.fromRequest({ ...req.body, boardId: req.params.boardId })
  );
  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await tasksService.update(
    Task.fromRequest({
      ...req.body,
      id: req.params.taskId,
      boardId: req.params.boardId
    })
  );
  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const id = req.params.taskId;
  await tasksService.remove(req.params.boardId, req.params.taskId);
  res.json(`The task with id: ${id} was deleted`);
});

module.exports = router;
