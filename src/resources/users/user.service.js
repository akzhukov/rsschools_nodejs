const usersRepo = require('./user.db.repository');
const { hashPassword } = require('../../helpers/hashHelpers');
const { NOT_FOUND } = require('http-status-codes');
const { ErrorInfo } = require('../../helpers/error');

const getAll = async () => usersRepo.getAll();

const get = async id => {
  const user = await usersRepo.get(id);
  if (!user) {
    throw new ErrorInfo(NOT_FOUND, `The user with id: ${id} not found`);
  }
  return user;
};

const getByLogin = async login => {
  const user = await usersRepo.getByLogin(login);
  if (!user) {
    throw new ErrorInfo(NOT_FOUND, `The user with login: ${login} not found`);
  }
  return user;
};

const create = async data => {
  const { password } = data;
  const hashedPassword = await hashPassword(password);
  return await usersRepo.create({ ...data, password: hashedPassword });
};

const update = async (id, data) => {
  const { password } = data;
  const hashedPassword = await hashPassword(password);
  const user = await usersRepo.update(id, {
    ...data,
    password: hashedPassword
  });
  if (!user) {
    throw new ErrorInfo(NOT_FOUND, `The user with id: ${id} not found`);
  }
  return user;
};

const remove = async id => {
  const isRemoved = await usersRepo.remove(id);
  if (!isRemoved) {
    throw new ErrorInfo(NOT_FOUND, `The user with login: ${id} not found`);
  }
  return id;
};

module.exports = {
  getAll,
  get,
  getByLogin,
  create,
  update,
  remove
};
