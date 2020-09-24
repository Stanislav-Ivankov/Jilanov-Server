const { Router } = require('express');

const attachTo = (app, passport, repository) => {
	const router = new Router();
	const validator = require('./sub-categories-validator')();
	const subCategoriesController = require('./sub-categories-controller')(repository);
	router
		.get('/sub-categories', subCategoriesController.getSubCategories)
		.get('/sub-categories/:category', subCategoriesController.getSubCategoriesByCategory)
		.patch('/sub-category/:id', validator.verifyEditSubCategory, passport.authenticate('jwt', { session: false }), subCategoriesController.editSubCategory)
		.post('/sub-category', validator.verifyCreateSubCategory, passport.authenticate('jwt', { session: false }), subCategoriesController.addSubCategory)
		.delete('/sub-category/:id', validator.verifyDeleteSubCategory, passport.authenticate('jwt', { session: false }), subCategoriesController.removeSubCategory)

	app.use('/api', router);
};

module.exports = { attachTo };