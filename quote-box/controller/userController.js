const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

/*
* @GET Get a user by user id
*/
exports.getSingleUser = async (req, res) => {
	try {
		const id = req.userId;

		const user = await User.findById(id);

		if(!user) {
			res.status(404).json({
				message: 'User is not existed.',
			})
			return;
		}

		res.status(200).json({
			user,
		})
	} catch (err) {
		console.log(err.message);
		res.status(500).json({
			message: err.message,
		})
	}
}

/*
* @POST Register a new user
*/
exports.registerUser = async (req, res) => {
	try {
		const { name, email, password } =  req.body;

		const user = await User.create({
			name,
			email,
			password,
		});

		let token;
		if(user) {
			token = await jwt.sign(
				{ id : user._id },
				'quote-box-jwt-secret-code',
				{ expiresIn : '12h' }
			)
		}

		if(token) {
			res.status(201).json({
				user,
				token,
			})
		}
	} catch(err) {
		console.log(err.message);
		res.status(500).json({
			message: err.message,
		})
	}
}

/*
* @POST Login a existing user
*/
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if(!email) {
			res.status(400).json({
				message: 'Please Provide a valid email'
			});
			return;
		}		

		if(!password) {
			res.status(400).json({
				message: 'Please Provide your password'
			});
			return;
		}

		const user = await User.findOne({ email: email }).select('+password');

		if(!user) {
			res.status(404).json({
				message: 'User is not existed.',
			});
			return;
		}

		const checkPassword = await bcrypt.compare(password, user.password);

		if(!checkPassword) {
			res.status(403).json({
				message: 'Password did not match on database.',
			});
			return;
		}

		let token;
		if(user) {
			token = await jwt.sign(
				{ id : user._id },
				'quote-box-jwt-secret-code',
				{ expiresIn : '12h' }
			)
		}

		if(token) {
			res.status(201).json({
				user,
				token,
			})
		}
	} catch(err) {
		console.log(err);
		res.status(500).json({
			message: err.message,
		})
	}
}