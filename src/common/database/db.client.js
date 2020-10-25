const mongoose = require('mongoose');
const logger = require('../../helpers/logger');

const connect = (MONGO_CONNECTION_STRING, cb) => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(async () => {
      console.log('MongoDB connected');
      await mongoose.connection.dropDatabase();
      cb();
    })
    .catch(error => {
      logger(null, error);
      process.exitCode = 1;
    });
};

module.exports = { connect };
