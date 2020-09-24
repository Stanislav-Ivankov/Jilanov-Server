const { Router } = require('express');

const attachTo = (app, repository) => {
	const router = new Router();
	const validator = require('./dashboard-validator')();
	const dashboardController = require('./dashboard-controller')(repository);

	router
	.get('/dashboard', dashboardController.getDashboardData)
	// .patch('/message', validator.verifyEditMessage, messagesController.editMessage)
	// .post('/message', validator.verifyCreateMessage, messagesController.createMessage)
	// .delete('/message', validator.verifyDeleteMessage, messagesController.deleteMessage)

	app.use('/api', router);
};

module.exports = { attachTo };