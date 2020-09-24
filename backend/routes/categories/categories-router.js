const { Router } = require('express');

const attachTo = (app, passport, repository) => {
	const router = new Router();
	const validator = require('./categories-validator')();
	const categoriesController = require('./categories-controller')(repository);
	// TODO: Implement multer image for post to optimise size and colors
	router
		.get('/categories', categoriesController.getCategories)
		.patch('/category/:id', validator.verifyEditMessage, passport.authenticate('jwt', { session: false }), categoriesController.editCategory)
		.post('/category', validator.verifyCreateMessage, passport.authenticate('jwt', { session: false }), categoriesController.addCategory)
		.delete('/category/:id', validator.verifyDeleteMessage, passport.authenticate('jwt', { session: false }), categoriesController.removeCategory)

	app.use('/api', router);
};

module.exports = { attachTo };