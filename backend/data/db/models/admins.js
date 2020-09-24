const mongoose = require('mongoose');

module.exports = mongoose.model(
	'Admin', 
	{
		_id: { 
			type: mongoose.Types.ObjectId, 
			auto: true
		},
		username: {
				type: String,
				required: true
		},
		hash: {
			type: String
		},
		salt: {
			type: String
		}
	}
);