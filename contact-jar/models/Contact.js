const mongoose =  require('mongoose');

const contactSchema = new mongoose.Schema({
	name: {
		type : String,
		requried : [true, 'Please insert a name.'],
	},
	email : {
		type : String,
		requried : [true, 'Please insert a email.'],
	},
	phone : {
		type : String,
		requried : [true, 'Please insert a phone.'],
	},
	type : {
		type :  String,
		default : 'personal'
	},
	user : {
		type : mongoose.Schema.ObjectId,
		ref : 'users',
	},
	createdAt : {
		type : Date,
		default : Date.now,
	}
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports =  Contact;