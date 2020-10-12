const DB = { Users: [], Tasks: [], Boards: [] };

const getAllUsers = async () => DB.Users;

const getUser = async id => DB.Users.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.Users.push(user);
  return getUser(user.id);
};

const updateUser = async user => {
  const oldUser = await getUser(user.id);
  if (!oldUser) {
    throw new Error(`The user with id: ${user.id} was not found`);
  }
  DB.Users[DB.Users.indexOf(oldUser)] = user;
  return user;
};

const removeUser = async id => {
  const user = await getUser(id);
  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }
  const tasks = DB.Tasks.filter(el => el.userId === id);
  tasks.forEach(element => {
    element.userId = null;
  });
  DB.Users.splice(DB.Users.indexOf(user), 1);
};

const getAllBoards = async () => DB.Boards;

const getBoard = async id => DB.Boards.filter(el => el.id === id)[0];

const createBoard = async board => {
  DB.Boards.push(board);
  return getBoard(board.id);
};

const updateBoard = async board => {
  const oldBoard = await getBoard(board.id);
  if (!oldBoard) {
    throw new Error(`The board with id: ${board.id} was not found`);
  }
  DB.Boards[DB.Boards.indexOf(oldBoard)] = board;
  return board;
};

const removeBoard = async id => {
  const board = await getBoard(id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  const tasks = await getTasksByBoardId(id);
  tasks.forEach(element => {
    removeTask(id, element.id);
  });
  DB.Boards.splice(DB.Boards.indexOf(board), 1);
};

const getTasksByBoardId = async id => DB.Tasks.filter(el => el.boardId === id);

const createTask = async task => {
  const board = await getBoard(task.boardId);
  if (!board) {
    throw new Error(`The board with id: ${task.boardId} was not found`);
  }
  DB.Tasks.push(task);
  return task;
};

const getTaskByBoardIdAndTaskId = async (boardId, taskId) =>
  DB.Tasks.filter(el => el.id === taskId)[0];

const updateTask = async task => {
  const oldTask = await getTaskByBoardIdAndTaskId(task.boardId, task.id);
  if (!oldTask) {
    throw new Error(`The task with id: ${task.id} was not found`);
  }
  DB.Tasks[DB.Tasks.indexOf(oldTask)] = task;
  return task;
};

const removeTask = async (boardId, taskId) => {
  const task = await getTaskByBoardIdAndTaskId(boardId, taskId);
  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }
  DB.Tasks.splice(DB.Tasks.indexOf(task), 1);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
  getTasksByBoardId,
  createTask,
  getTaskByBoardIdAndTaskId,
  updateTask,
  removeTask
};
