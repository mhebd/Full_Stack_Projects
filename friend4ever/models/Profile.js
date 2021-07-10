const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	status: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	}, 
	bio: {
		type: String,
	}, 
	nickName: {
		type: String,
	}, 
	phone: {
		type: String,
	}, 
	skills: {
		type: [String], 
	},
	following: [
		{
			user_id: {
				type: mongoose.Schema.Types.ObjectId,
			},
			name: String, 
			avatar: String, 
			location: String,
		}
	], 
	followers: [
		{
			user_id: {
				type: mongoose.Schema.Types.ObjectId,
			},
			name: String, 
			avatar: String, 
			location: String,
		}
	],
	experience: [
		{
			title: {
				type: String,
				required: true,
			}, 
			company: {
				type: String,
				required: true,
			}, 
			from: {
				type: Date,
				required: true,
			}, 
			to: {
				type: Date,
			}, 
			current: {
				type: Boolean, 
				default: false,
			}, 
			description: {
				type: String,
			}
		}
	], 
	education: [
		{
			school: {
				type: String,
				required: true,
			}, 
			degree: {
				type: String,
				required: true,
			}, 
			from: {
				type: Date,
				required: true,
			}, 
			to: {
				type: Date,
			}, 
			current: {
				type: Boolean, 
				default: false,
			}, 
			description: {
				type: String,
			}
		}
	], 
	social: {
		website: String,
		youtube: String,
		facebook: String,
		twitter: String,
		linkedin: String,
		instagram: String,
	}
});

const Profile =  mongoose.model('profile', profileSchema);

module.exports = Profile;