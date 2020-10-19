const DB = require('../../common/inMemoryDB');
const { ErrorInfo } = require('../../helpers/error');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new ErrorInfo(404, `The user with id: ${id} was not found`);
  }

  return user;
};

const create = async user => DB.createUser(user);

const update = async user => DB.updateUser(user);

const remove = async id => DB.removeUser(id);

module.exports = { getAll, get, create, update, remove };
