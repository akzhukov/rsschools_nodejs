const userService = require('../users/user.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkPassword } = require('../../helpers/hashHelpers');

const signToken = async (login, password) => {
  const user = await userService.getByLogin(login);
  if (!user) {
    return null;
  }
  const { password: hashedPasswod } = user;
  if (await checkPassword(password, hashedPasswod)) {
    const { id } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
    return token;
  }
  return null;
};

module.exports = {
  signToken
};
