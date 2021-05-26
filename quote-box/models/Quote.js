const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
	quote : {
		type : String,
		required : [true, 'Please provide a quote message'],
		trim : true,
		minLength : [10, 'quote must be at least 10 characters'],
	},
	owner : {
		type : String,
	},
	userId : {
		type : mongoose.Schema.ObjectId,
		ref : 'user',
	},
	createdAt : {
		type : Date,
		default : Date.now,
	}
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;