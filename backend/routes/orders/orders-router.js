const { Router } = require('express');

const attachTo = (app, passport, repository) => {
	const router = new Router();
	const validator = require('./orders-validator')();
	const ordersController = require('./orders-controller')(repository);

	router
		.get('/orders', ordersController.getOrders)
		.post('/order', validator.verifyCreateOrder, passport.authenticate('jwt', { session: false }), ordersController.addOrder)
		.delete('/orders', validator.verifyDeleteOrder, passport.authenticate('jwt', { session: false }), ordersController.removeOrder)

	app.use('/api', router);
};

module.exports = { attachTo };