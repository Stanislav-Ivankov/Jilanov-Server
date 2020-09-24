const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const PATH_TO_RSA_PRIVATE_KEY = path.join(__dirname, '../.keys/', 'RSA_PRIVATE_KEY.pem');
const RSA_PRIVATE_KEY = fs.readFileSync(PATH_TO_RSA_PRIVATE_KEY, 'utf-8');
// console.log(RSA_PRIVATE_KEY);



let issueJWT = user => {
	let _id = user._id;
	let tokenExpirationTime = '1d';

	// Model The Object After The JWT Claims
	// 'sub' -> Subject (  Identifies The Subject Of The JWT ),
	// 'iat' -> Issued At ( The Current Time The JWT Is Generated, Thus We Use Date.now() )
	let payload = {
		sub: _id,
		iat: Date.now()
	};

	// Digitally Sign The JWT
	let signedJWT = jsonwebtoken.sign(payload, RSA_PRIVATE_KEY, {
		expiresIn: tokenExpirationTime,
		algorithm: 'RS256'
	});

	return {
		Token: `Bearer ${ signedJWT }`,
		Expires: tokenExpirationTime
	}
}

// Returns 'true' IF AND ONLY IF The Original Hash And The Decrypted ( The Hashed Password In The MongoDB ) Hash Are Equal
let isValidPassword = (password, hash, salt) => {
	let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

	return hash == hashVerify;
}

let generatePassword = password => {
	let salt = crypto.randomBytes(32).toString('hex'); // Generate Salt To Store It In MongoDB
	let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex'); // Generate Hash To Store It In MongoDB

	return { salt, hash }
}



module.exports.issueJWT = issueJWT;
module.exports.isValidPassword = isValidPassword;
module.exports.generatePassword = generatePassword;