const { Router } = require('express');

const attachTo = (app, passport, repository, upload) => {
	const router = new Router();
	const validator = require('./footer-links-validator')();
	const footerLinksController = require('./footer-links-controller')(repository);
	// TODO: Implement multer image for post to optimise size and colors
	router
		.get('/footer-links', footerLinksController.getFooterLinks)
		// .patch('/message', validator.verifyEditMessage, passport.authenticate('jwt', { session: false }), messagesController.editMessage)
		// .post('/message', validator.verifyCreateMessage, passport.authenticate('jwt', { session: false }), upload.single('image'), messagesController.createMessage)
		// .delete('/message', validator.verifyDeleteMessage, passport.authenticate('jwt', { session: false }), messagesController.deleteMessage)

	app.use('/api', router);
};

module.exports = { attachTo };