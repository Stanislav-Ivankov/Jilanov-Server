const { Router } = require('express');

const attachTo = (app, repository) => {
  const router = new Router();
  const validator = require('./warranties-validator')();
  const productsController = require('./products-controller')(repository);

  router
    .get('/warranties', productsController.getProducts)
    // .patch('/message', validator.verifyEditMessage, messagesController.editMessage)
    // .post('/message', validator.verifyCreateMessage, messagesController.createMessage)
    // .delete('/message', validator.verifyDeleteMessage, messagesController.deleteMessage)

  app.use('/api', router);
};

module.exports = { attachTo };
