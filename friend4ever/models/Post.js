const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	post: {
		type: String,
		required: true,
	}, 
	userName: {
		type: String,
		required: true,
	}, 
	userAvatar: {
		type: String,
		required: true,
	}, 
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
	},
	likes: [
		// {
		// 	type: mongoose.Schema.Types.ObjectId,
		// }
		String,
	], 
	comments: [
		{
			comment: {
				type: String,
				required: true,
			}, 
			userName: {
				type: String,
				required: true,
			}, 
			userAvatar: {
				type: String,
				required: true, 
			},
			user: {
				type: mongoose.Schema.Types.ObjectId,
			}, 
			created: {
				type: Date,
				default: Date.now
			}
		}
	], 
	created: {
		type: Date,
		default: Date.now
	}
});

const Post =  mongoose.model('post', postSchema);

module.exports = Post;