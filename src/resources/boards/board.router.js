const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { OK, NOT_FOUND } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.get(req.params.id);
    if (board) {
      res.status(OK).json(Board.toResponse(board));
    } else {
      res.status(NOT_FOUND).json(`The board with ${req.params.id} not found`);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardService.create(
      new Board({ title: req.body.title, columns: req.body.columns })
    );
    res.json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    const isRemoved = await boardService.remove(req.params.id);
    if (isRemoved) {
      res.status(OK).json(`The board with ${id} has been deleted`);
    } else {
      res.status(NOT_FOUND).json(`The board with ${id} not found`);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
