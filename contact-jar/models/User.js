const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type : String,
		required: [true, 'Please enter a user name.']
	},
	email : {
		type : String,
		required: [true, 'Please enter a user email.'],
		unique : true,
	},
	password : {
		type : String,
		required: [true, 'Please enter a user password.'],
		minLength: 6,
	},
	createdAt : {
		type : Date,
		default : Date.now
	}
});

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password, 12);
})

const User =  mongoose.model('User', userSchema);

module.exports = User;