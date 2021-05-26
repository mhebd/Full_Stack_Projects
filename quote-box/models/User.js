const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');

const userSchema = new mongoose.Schema({
	name : {
		type : String,
		required : [true, 'Please provide a valid username'],
		trim : true,
		minLength : [3, 'Name must be at least 3 characters'],
	},
	email : {
		type : String,
		required : [true, 'Please provide a valid email'],
		unique : true,
	},
	password : {
		type : String,
		required : [true, 'Please provide a password'],
		minLength : [6, 'Password must be at least 6 charactersa'],
		select : false,
	},
	isAuthenticated : {
		type : Boolean,
		default : true,
	},
	createdAt : {
		type : Date,
		default : Date.now,
	}
});

userSchema.pre('save', async function() {
	this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;