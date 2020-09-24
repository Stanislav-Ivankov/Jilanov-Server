module.exports = {
	api: {
		port: process.env.PORT || 3200,
	},
	database: {
		dbAddress: process.env.MONGO_URL || ''
	}
};