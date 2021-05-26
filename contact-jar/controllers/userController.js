const User = require('./../models/User');
const jwt = require('jsonwebtoken');

/*
* @GET Get a user
*/
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password');

		res.status(200).json({
			user,
		})
	} catch (err) {
		res.status(404).json({
			message: 'User Not Found.'
		})
	}
}

/*
*	@POST Crate a user 
*/

exports.createUser = async (req, res) => {
	try {
		const {name, email, password} = req.body;

		const findUser = await User.findOne({ email: email });

		if(findUser) {
			res.status(400).json({
				message: 'User already existed.',
			})
			return;
		}

		const user = await User.create({
			name,
			email,
			password,
		});

		let token;

		if(user) {
			token = await jwt.sign({ id : user._id }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRATION,
			})
		}

		res.status(200).json({
			token,
		})
	} catch(err) {
		console.log(err)
	}
}