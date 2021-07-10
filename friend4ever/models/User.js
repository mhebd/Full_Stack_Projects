const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true, 
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	avatar: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	}, 
	created: {
		type: Date,
		default: Date.now, 
	}
});

const User =  mongoose.model('user', userSchema);

module.exports = User;