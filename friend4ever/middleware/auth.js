const asyncErrHdl = require('../util/asyncErrHand');
const errObj = require('../util/errObj');
const jwt = require('jsonwebtoken');


/**
* @Auth_Middleware 
* ->Desc: Give permission for a specifit user...
*/
module.exports = auth = asyncErrHdl(async (req, res, next) => {
	const token = req.header('x-auth-token');

	if(!token) {
		return next(new errObj('No token found, authorization denied', 401));
	};

	const decode = await jwt.verify(token, process.env.SECRET);

	req.userId = decode.id;

	next();
});