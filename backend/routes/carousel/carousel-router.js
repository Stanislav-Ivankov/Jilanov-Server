const { Router } = require('express');

const attachTo = (app, passport, repository, upload) => {
	const router = new Router();
	const validator = require('./carousel-validator')();
	const carouselController = require('./carousel-controller')(repository);
	const uploadHandler = upload.fields([{ name: 'web', maxCount: 1 }, { name: 'mobile', maxCount: 1 }])
	// TODO: Implement multer image for post to optimise size and colors
	router
		.get('/carousel', carouselController.getSlides)
		.patch('/carousel/slide/:id', validator.verifyEditSlide, passport.authenticate('jwt', { session: false }), uploadHandler, carouselController.editSlide)
		.post('/carousel', validator.verifyCreateSlide, passport.authenticate('jwt', { session: false }), uploadHandler, carouselController.addSlide)
		.delete('/carousel/slide/:id', validator.verifyDeleteSlide, passport.authenticate('jwt', { session: false }), carouselController.removeSlide)

	app.use('/api', router);
};

module.exports = { attachTo };