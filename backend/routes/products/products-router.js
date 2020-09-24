const { Router } = require('express');

const attachTo = (app, passport, repository, upload) => {
  const router = new Router();
  const validator = require('./products-validator')();
  const productsController = require('./products-controller')(repository);
  // TODO: Implement multer image for post to optimise size and colors
  const cpUpload = upload.array('files', 10);
  router
    .get('/products', productsController.getProducts)
    .get('/products/product', productsController.getProduct)
    .get('/products/product/:category', productsController.getProductsByCategory)
    .patch('/products/product/:id', validator.verifyEditProduct, passport.authenticate('jwt', { session: false }), cpUpload, productsController.editProduct)
    .post('/products', validator.verifyCreateProduct, passport.authenticate('jwt', { session: false }), cpUpload, productsController.addProduct)
    .delete('/products/product/:id', validator.verifyDeleteProduct, passport.authenticate('jwt', { session: false }), productsController.removeProduct);

  app.use('/api', router);
};

module.exports = { attachTo };
