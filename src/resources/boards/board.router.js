const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.get(req.params.id);
  if (!board) return res.status(404).json('');
  return res.json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(
    new Board({ title: req.body.title, columns: req.body.columns })
  );
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.update(
    Board.fromResponce({ ...req.body, id: req.params.id })
  );
  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  await boardService.remove(req.params.id);
  res.json(`The board with id: ${id} was deleted`);
});

module.exports = router;
