const asyncErrHdl = require('../util/asyncErrHand');
const errObj = require('../util/errObj');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
* @POST 
* ->Route: /api/user/register
* ->Access: Public
* ->Desc: Create a new user...
*/
exports.createUser = asyncErrHdl(async (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body; 

	if(!name || !email || !password || !confirmPassword) {
		return next(new errObj('All the field are required.', 400));
	};

	if(password !== confirmPassword) {
		return next(new errObj('Password & Confirm Password did not match', 400));
	};

	const avatar = gravatar.url(email, {
		s: '200',
		r: 'pg', 
		d: 'mm'
	});

	const hashPassword = await bcrypt.hash(password, 12);

	const user = await User.create({
		name,
		email,
		avatar,
		password: hashPassword,
	});

	const token = await jwt.sign({id: user._id}, process.env.SECRET, {
		expiresIn: process.env.EXPIRETION,
	});

	res.json({
		token,
	});
});


/**
* @POST 
* ->Route: /api/user/login
* ->Access: Public
* ->Desc: Login an existing new user...
*/
exports.loginUser = asyncErrHdl(async (req, res, next) => {
	const { email, password } = req.body; 

	if(!email || !password) {
		return next(new errObj('All the fields are required.', 400));
	};

	const user = await User.findOne({ email });

	if(!user) {
		return next(new errObj('No user found.', 404));
	};

	const matchPassword = await bcrypt.compare(password, user.password);

	if(!matchPassword) {
		return next(new errObj('Your password is incurrect.', 401));
	};
	
	const token = await jwt.sign({id: user._id}, process.env.SECRET, {
		expiresIn: process.env.EXPIRETION,
	});

	res.json({
		token,
	})
});


/**
* @GET 
* ->Route: /api/user
* ->Access: Private
* ->Desc: Get all user together
*/
exports.users = asyncErrHdl(async (req, res, next) => {
	const users = await User.find().select('-password');

	res.json({
		users,
	})
});



/**
* @GET 
* ->Route: /api/user/me
* ->Access: Private  
* ->Desc: Get a specific User information.
*/
exports.singUser = asyncErrHdl(async (req, res, next) => {
	const id = req.userId;

	const user = await User.findById(id).select('-password');

	if(!user) {
		return next(new errObj('No user found.', 404));
	};

	res.json({
		user,
	})
});


/**
* @GET 
* ->Route: /api/user/:user_id
* ->Access: Private  
* ->Desc: Get a specific User information.
*/
exports.singUserById = asyncErrHdl(async (req, res, next) => {
	const id = req.params.user_id;

	const user = await User.findById(id).select('-password');

	if(!user) {
		return next(new errObj('No user found.', 404));
	};

	res.json({
		user,
	})
});