const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const hashPassword = async password => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const checkPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  checkPassword
};
