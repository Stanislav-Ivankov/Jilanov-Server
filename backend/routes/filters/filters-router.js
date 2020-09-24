const { Router } = require('express');

const attachTo = (app, passport, repository) => {
	const router = new Router();
	const validator = require('./filters-validator')();
	const filtersController = require('./filters-controller')(repository);

	router
		.get('/filters/:category', filtersController.getFiltersByCategory)
		// .patch('/message', validator.verifyEditMessage, passport.authenticate('jwt', { session: false }), messagesController.editMessage)
		// .post('/message', validator.verifyCreateMessage, passport.authenticate('jwt', { session: false }), messagesController.createMessage)
		// .delete('/message', validator.verifyDeleteMessage, passport.authenticate('jwt', { session: false }), messagesController.deleteMessage)

	app.use('/api', router);
};

module.exports = { attachTo };