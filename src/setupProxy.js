const weatherRouter = require('./api/weather');

module.exports = function setupProxy(app) {
  app.use('/api', weatherRouter);
};
