const { Router } = require('express');

const attachTo = (app, passport, repository) => {
	const router = new Router();
	const validator = require('./messages-validator')();
	const messagesController = require('./messages-controller')(repository);

	router
		.get('/messages', messagesController.getMessages)
		.post('/message', validator.verifyCreateMessage, passport.authenticate('jwt', { session: false }), messagesController.addMessage)
		.delete('/message', validator.verifyDeleteMessage, passport.authenticate('jwt', { session: false }), messagesController.removeMessage)

	app.use('/api', router);
};

module.exports = { attachTo };