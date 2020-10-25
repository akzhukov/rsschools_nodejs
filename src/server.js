const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const dbClient = require('./common/database/db.client');
const app = require('./app');

dbClient.connect(MONGO_CONNECTION_STRING, () => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
