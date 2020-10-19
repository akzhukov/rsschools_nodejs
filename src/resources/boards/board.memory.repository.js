const DB = require('../../common/inMemoryDB');
const { ErrorInfo } = require('../../helpers/error');

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = DB.getBoard(id);

  if (!board) {
    throw new ErrorInfo(404, `The board with id: ${id} was not found`);
  }

  return board;
};

const create = async board => DB.createBoard(board);

const update = async board => DB.updateBoard(board);

const remove = async id => DB.removeBoard(id);

module.exports = { getAll, get, create, update, remove };
