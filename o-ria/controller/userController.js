const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcrypt');

/*
* @POST Create a new user
*/
exports.registerUser = async (req, res) => {
	try {
		const { name, email, password, confirmPassword } = req.body;
		if(password !== confirmPassword) {
			res.status(404).json({
				message: 'Your password and confirmPassword did not match.',
			});
			return;
		};

		const user = await User.create({
			name,
			email,
			password,
		});

		let token;
		if(user) {
			token = await jwt.sign({id : user._id}, process.env.SECRET, { expiresIn: process.env.EXPIRETION });
		};

		res.status(200).json({
			token,
		})
	} catch(err) {
		console.log(err.message);
		res.status(404).json({
			message: err.message,
		})
	}
};

/*
* @POST Login a existing user
*/
exports.loginUser = async (req, res) => {
	try {
		const {email, password} = req.body;

		if(!email || !password) {
			res.status(404).json({
				message: 'Please enter your email address and password.',
			});
			return;
		};

		const user = await User.findOne({email: email});

		if(!user) {
			res.status(404).json({
				message: 'User did not exist.',
			});
			return;
		};

		const checkPassword = await bcrypt.compare(password, user.password);

		if(!checkPassword) {
			res.status(404).json({
				message: 'Your password did not match on resource.',
			});
			return;
		};

		let token;
		if(user) {
			token = await jwt.sign({id : user._id}, process.env.SECRET, { expiresIn: process.env.EXPIRETION });
		};

		res.status(200).json({
			token,
		})
	} catch(err) {
		console.log(err.message);
		res.status(404).json({
			message: err.message,
		})
	}
};

/*
* ->@GET Get a existing user
* ->Private Route
*/
exports.getUser = async (req, res) => {
	try {
		console.log('from user')
		const userId = req.userId;

		const user = await User.findById(userId);
		console.log(user)

		if(!user) {
			res.status(404).json({
				message: 'User did not exist.',
			});
			return;
		}

		res.json({
			user,
		})
	} catch(err) {
		console.log(err);
		res.status(404).json({
			message: err.message,
		})
	}
};