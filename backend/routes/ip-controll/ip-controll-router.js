const { Router } = require('express');

const attachTo = (app, repository, upload) => {
  const router = new Router();
  const ipControllController = require('./ip-controll-controller')(repository);
  router.get('/ip-controll', ipControllController.validateID)
  app.use('/api', router);
};

module.exports = { attachTo };
