const { Router } = require('express');

const attachTo = (app, passport, repository, upload) => {
	const router = new Router();
	const validator = require('./users-validator')();
	const productsController = require('./users-controller')(repository);
	// TODO: Implement multer image for post to optimise size and colors
	router
		.get('/users/login', passport.authenticate('jwt', { session: false }), productsController.getProducts)
		// .patch('/message', validator.verifyEditMessage, passport.authenticate('jwt', { session: false }), messagesController.editMessage)
		// .post('/message', validator.verifyCreateMessage, passport.authenticate('jwt', { session: false }), upload.single('image'), messagesController.createMessage)
		// .delete('/message', validator.verifyDeleteMessage, passport.authenticate('jwt', { session: false }), messagesController.deleteMessage)

	app.use('/api', router);
};

module.exports = { attachTo };