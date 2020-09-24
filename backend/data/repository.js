// The Value Is The Model With Which The Mongoose Interacts With The MongoDB Via its Static Methods.
const db = {
	'Admins': require('./db/models/admins'),
	'Categories': require('./db/models/categories'),
	'SubCategories': require('./db/models/sub-categories'),
	'FooterLinks': require('./db/models/footer-links'),
	'Messages': require('./db/models/messages'),
	'Orders': require('./db/models/orders'),
	'Filters': require('./db/models/filters'),
	'Products': require('./db/models/products'),
	'Slides': require('./db/models/slides'),
	'Users': require('./db/models/users'),
	'WhitelistIPS': require('./db/models/allowed-ips')
};

const init = () => {
	const create = request => db[request.modelName].create(request.newObject);
	const findOne = request => db[request.modelName].findOne(request.options || {});
	const find = request => db[request.modelName].find(request.options || {});
	const remove = request => db[request.modelName].deleteOne({ _id: request.record._id });
	const update = request => {
		let keys = Object.keys(request.updatedRecord).filter(key => key !== '_id');
		let setter = {};

		for(let counter = 0; counter < keys.length; counter++) {
			setter[keys[counter]] = request.updatedRecord[keys[counter]];
		}

		return db[request.modelName].findOneAndUpdate({ _id: request.updatedRecord._id }, setter, { new: true, returnNewDocument: true, returnOriginal: false });
	}

	return { create, findOne, find, remove, update };
};

module.exports = { init };