const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	const token = req.header('x-auth-token');

	if(!token) {
		res.status(404).json({
			message: 'No token found.',
		});
		return;
	}

	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET);

		req.userId = decode.id;
		next();
	} catch(err) {
		console.log(err)
	}
}