const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A person must be a name.'],
		minLength: 3
	},
	email: String,
	phone: String,
	avatar: {
		type: String,
		required: [true, 'A person must be a avatar.']
	},
	type: {
		type: String,
		enum: ['friend', 'family', 'relative', 'others'],
		default: 'Friend'
	},
	age: String,
	address: {
		type: String,
		required: [true, 'A person must be a address.'],
	},
	details: String,
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

const Person =  mongoose.model('Person', personSchema);

module.exports = Person;