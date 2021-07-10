const errObj = require('../util/errObj');
const asyncHandler = require('../util/asyncErrHand');

const error = (err, req, res, next) => {
	console.log(err)
	let message = err.message || 'Server error';
	let statusCode = err.statusCode || 500;

	if(err.code === 11000) {
		message = 'Already have an account with this email.';
		statusCode = 400;
	};

	res.status(statusCode || 500).json({
		message,
	});
	next();
};

module.exports = error;