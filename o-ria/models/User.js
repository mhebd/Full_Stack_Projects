const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type : String,
		required: [true, 'A user must be a name.'],
		minLength: 3,
	},
	email: {
		type : String,
		required: [true, 'A user must be a email address.'],
		unique: [true, 'This email address is already exist.'],
	},
	password: {
		type : String,
		required: [true, 'A user must be a strong password.'],
		minLength: [6, 'Password must be at least 6 characters long.'],
		maxLength: [16, 'Password can not greater than 16 characters long'],
	},
	created_At: {
		type: Date,
		default: Date.now,
	},
	type: {
		type: String,
		enum: ['user'],
		default: 'user',
	}
});

userSchema.pre('save', async function() {
	this.password = await bcrypt.hash(this.password, 12);
});


const User =  mongoose.model('User', userSchema);

module.exports = User;