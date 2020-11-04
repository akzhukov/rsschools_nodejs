const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { OK } = require('http-status-codes');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.status(OK).json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.get(req.params.id);
  res.status(OK).json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(req.body);
  res.status(OK).json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.update(req.params.id, req.body);
  res.status(OK).json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await boardService.remove(id);
  res.status(OK).json({ id });
});

module.exports = router;
