const jwt = require('jsonwebtoken');

/*
* @MIDDLEWARE Authenticat a use by token 
*/
exports.auth = async (req, res, next) => {
	try {
		console.log('from auth')
		const token = req.header('x-auth-token');

		if(!token) {
			res.status(404).json({
				message: 'NO Token authorization denied.',
			});
			return;
		};

		const decode = await jwt.verify(token, process.env.SECRET);

		req.userId = decode.id;
		next();
	} catch(err) {
		console.log(err.message);
		res.status(404).json({
			message: err.message,
		})
	}
};