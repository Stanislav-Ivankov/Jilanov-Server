const fs = require('fs');
const path = require('path');
const Admins = require('../../data/db/models/admins');

const JWT_STRATEGY = require('passport-jwt').Strategy // Import The Class In Order To Create 'new JwtStrategy(...)' Object On Each Request
const EXTRACT_JWT = require('passport-jwt').ExtractJwt; // Import The Namespace Due To  'fromAuthHeaderAsBearerToken(...)' Extraction Function

let PATH_TO_RSA_PUBLIC_KEY = path.join(__dirname, '../../.keys/', 'RSA_PUBLIC_KEY.pem');
let RSA_PUBLIC_KEY = fs.readFileSync(PATH_TO_RSA_PUBLIC_KEY, 'utf-8');
// console.log(RSA_PUBLIC_KEY);



let options = {
	jwtFromRequest: EXTRACT_JWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: RSA_PUBLIC_KEY,
	algorithms: ['RS256']
}

module.exports = passport => {

	passport.use(new JWT_STRATEGY(options, (JWT_Payload, done) => {

		Admins.findOne({ _id: JWT_Payload.sub }, (err, admin) => {

			if (err) {
				return done(err, false);
			}
			if(admin) {
				return done(null, admin);
			}
			else {
				return done(null, false);
			}
		});
	}));
}