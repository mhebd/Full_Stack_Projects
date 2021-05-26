const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	try {
		const token = req.headers['x-auth-token'];
		
		if(!token) {
			res.status(400).json({
				message: 'You are not authorized to access this page.',
			});
			return;
		}

		const decode = await jwt.verify(token, 'quote-box-jwt-secret-code');

		req.userId = decode.id;
		
		next();
	} catch (err) {
		console.log(err.message);
		res.status(404).json({
			message: err.message,
		})
	}
}