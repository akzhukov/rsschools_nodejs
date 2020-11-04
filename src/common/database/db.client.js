const mongoose = require('mongoose');
const logger = require('../../helpers/logger');
const { hashPassword } = require('../../helpers/hashHelpers');
const User = require('../../resources/users/user.model');

const addAdminUser = async () => {
  const hashedPassword = await hashPassword('admin');
  User.create({
    name: 'adminUser',
    login: 'admin',
    password: hashedPassword,
    id: 1
  });
};

const connect = (MONGO_CONNECTION_STRING, cb) => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(async () => {
      console.log('MongoDB connected');
      await mongoose.connection.dropDatabase();
      await addAdminUser();
      cb();
    })
    .catch(error => {
      logger(null, error);
      process.exitCode = 1;
    });
};

module.exports = { connect };
