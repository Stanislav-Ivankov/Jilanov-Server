const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const multer  = require('multer')
const passport = require('passport');
const helmet = require('helmet');

const storage = multer.diskStorage({
	destination: function (_req, _file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
		cb(null, Date.now() + ext)
	}
});

const upload = multer({ storage: storage });
// const morgan = require('morgan');
const cors = require('cors');

const init = async repository => {
	const app = express();

	require('../config/passport')(passport);
	app.use(passport.initialize());

	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieParser());
	app.use(helmet());
	app.use('/static', express.static('uploads'))
	// app.use(morgan('dev', { skip: (_req, res) => res.statusCode < 400 }));

	// Routers
	require('./../../routes/admins/admins-router').attachTo(app, passport, repository);
	require('./../../routes/carousel/carousel-router').attachTo(app, passport, repository, upload);
	require('./../../routes/categories/categories-router').attachTo(app, passport, repository);
	require('./../../routes/sub-categories/sub-categories-router').attachTo(app, passport, repository);
	require('./../../routes/messages/messages-router').attachTo(app, passport, repository);
	require('./../../routes/orders/orders-router').attachTo(app, passport, repository);
	require('./../../routes/products/products-router').attachTo(app, passport, repository, upload);
	require('./../../routes/filters/filters-router').attachTo(app, passport, repository);
	require('./../../routes/footer-links/footer-links-router').attachTo(app, passport, repository, upload);
	require('./../../routes/users/users-router').attachTo(app, passport, repository, upload);

	app.use((_req, _res, next) => { next(createError(404)) });
	app.use((err, req, res, next) => {
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		res.status(err.status || 500);
		next();
	});

	return app;
};

module.exports = { init };