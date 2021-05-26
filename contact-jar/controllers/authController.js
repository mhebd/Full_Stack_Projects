const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
*	@POST Login a user
*/
exports.loginUser = async (req, res) => {
	try {
		const {email, password} = req.body;

		if(!email || !password) {
			res.status(400).json({
				message: 'Please enter your email and password.',
			})
			return;
		}

		let user = await User.findOne({ email: email});

		if(!user) {
			res.status(404).json({
				message: 'User Not Existed',
			})
			return;
		}

		const checkPass =  await bcrypt.compare(password, user.password);

		if(!checkPass) {
			res.status(400).json({
				message: 'Passwords do not match.',
			})
			return;
		}

		const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION,
		})

		res.status(200).json({
			token,
		})
	} catch (err) {
		console.log(err)
	}
}