const { Router } = require('express');

const attachTo = (app, passport, repository) => {
	const router = new Router();
	const validator = require('./admins-validator')();
	const adminsController = require('./admins-controller')(repository);

	router
		.post('/admin/login', validator.verifyLoginData, adminsController.login)
		.get('/admin/protected', passport.authenticate('jwt', { session: false }), adminsController.privateInformation)
		// .get('/products', productsController.getProducts)
		// .patch('/message', validator.verifyEditMessage, messagesController.editMessage)
		// .post('/message', validator.verifyCreateMessage, messagesController.createMessage)
		// .delete('/message', validator.verifyDeleteMessage, messagesController.deleteMessage)

	app.use('/api', router);
};

module.exports = { attachTo };