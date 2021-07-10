const asyncErrHdl = require('../util/asyncErrHand');
const errObj = require('../util/errObj');
const Profile = require('../models/Profile');
const User = require('../models/User');


/**
* @POST 
* ->Route: /api/profile
* ->Access: Private
* ->Desc: Create Or Update new profile...
*/
exports.createProfile = asyncErrHdl(async (req, res, next) => {
	const { status, location, bio, nickName, phone, skills, website, youtube, facebook, twitter, linkedin, instagram } = req.body;

	let profileFields = {};

	profileFields.user = req.userId;
	if(status) profileFields.status =  status;
	if(location) profileFields.location =  location;
	if(bio) profileFields.bio =  bio;
	if(nickName) profileFields.nickName =  nickName;
	if(phone) profileFields.phone =  phone;

	if(skills) profileFields.skills =  skills.split(',').map(skill => skill.trim());

	profileFields.social = {};

	if(website) profileFields.social.website =  website;
	if(youtube) profileFields.social.youtube =  youtube;
	if(facebook) profileFields.social.facebook =  facebook;
	if(twitter) profileFields.social.twitter =  twitter;
	if(linkedin) profileFields.social.linkedin =  linkedin;
	if(instagram) profileFields.social.instagram =  instagram;

	let profile = await Profile.findOne({user: req.userId});

	if(profile) {
		//If profile, update profile
		profile = await Profile.findByIdAndUpdate(
			profile._id, 
			{$set: profileFields}, 
			{new: true}
		);
	} else {
		//Create Profile 
		profile = await Profile.create(profileFields);
	};

	res.json({
		profile,
	});
});


/**
* @GET 
* ->Route: /api/profile/
* ->Access: Private
* ->Desc: Get all profile information
*/
exports.allProfiles = asyncErrHdl(async (req, res, next) => {
	const profiles = await Profile.find().populate('user', ['name', 'email', 'avatar']);

	res.json({
		profiles,
	})
});



/**
* @GET 
* ->Route: /api/profile/:user_id
* ->Access: Private
* ->Desc: Get a user profile by profile id...
*/
exports.getProfileById = asyncErrHdl(async (req, res, next) => {
	const user_id = req.params.user_id;

	const profile = await Profile.findOne({user: user_id}).populate('user', ['name', 'avatar', 'email']);

	if(!profile) {
		return next(new errObj('No profile with this id.', 404));
	};

	res.json({
		profile,
	})
});



/**
* @GET 
* ->Route: /api/profile/me 
* ->Access: Private
* ->Desc: Get my porfile...
*/
exports.profile = asyncErrHdl(async (req, res, next) => {
	const user = req.userId;

	const profile = await Profile.findOne({user}).populate('user', ['name', 'avatar', 'email']);

	if(!profile) {
		return next(new errObj('No profile exists with this user.', 404));
	};

	res.json({
		profile,
	})
});



/**
* @DELETE 
* ->Route: /api/profile/me
* ->Access: Private
* ->Desc: Delete user account and profile information...
*/
exports.deleteUserAndProfile = asyncErrHdl(async (req, res, next) => {
	const userId = req.userId;

	const profile = await Profile.findOne({user: userId});

	if(profile) {
		//Delete profile 
		await Profile.findByIdAndDelete(profile._id);
	};

	//Delete user 
	await User.findByIdAndDelete(userId);

	res.send('User Deleted');
});


/**
* @PUT 
* ->Route: /api/profile/experience/
* ->Access: Private 
* ->Desc: Create and add an experience...
*/
exports.createExperience = asyncErrHdl(async (req, res, next) => {
	const user = req.userId;
	const { title, company, from, to, current, description } = req.body;

	const newExp = {
		title, 
		company,
		from,
		to,
		current,
		description,
	}

	const profile = await Profile.findOne({user});

	if(!profile) {
		return next(new errObj('No profile found to add experience.', 404));
	};

	profile.experience.unshift(newExp);

	await profile.save();

	res.json({
		profile,
	})
});



/**
* @DELETE 
* ->Route: /api/profile/experience/:exp_id
* ->Access: Private 
* ->Desc: Delete an experience...
*/
exports.deleteExperience = asyncErrHdl(async (req, res, next) => {
	const user = req.userId;
	const id = req.params.exp_id;

	const profile = await Profile.findOne({user});

	if(!profile) {
		return next(new errObj('No profile found to delete experience.', 404));
	};

	const filteredExp = profile.experience.filter(exp => exp._id.toString() !== id);

	profile.experience = filteredExp;

	await profile.save();

	res.json({
		profile,
	})
});



/**
* @PUT 
* ->Route: /api/profile/education/
* ->Access: Private 
* ->Desc: Create and add an education...
*/
exports.createEducation = asyncErrHdl(async (req, res, next) => {
	const user = req.userId;
	const { school, degree, from, to, current, description } = req.body;

	const newEdu = {
		school, 
		degree,
		from,
		to,
		current,
		description,
	}

	const profile = await Profile.findOne({user});

	if(!profile) {
		return next(new errObj('No profile found to add experience.', 404));
	};

	profile.education.unshift(newEdu);

	await profile.save();

	res.json({
		profile,
	})
});



/**
* @DELETE 
* ->Route: /api/profile/education/:edu_id
* ->Access: Private 
* ->Desc: Delete an education...
*/
exports.deleteEducation = asyncErrHdl(async (req, res, next) => {
	const user = req.userId;
	const id = req.params.edu_id;

	const profile = await Profile.findOne({user});

	if(!profile) {
		return next(new errObj('No profile found to delete education.', 404));
	};

	const filteredEdu = profile.education.filter(edu => edu._id.toString() !== id);

	profile.education = filteredEdu;
	
	await profile.save();

	res.json({
		profile,
	})
});




/**
* @PUT 
* ->Route: /api/profile/follow/:followers_id
* ->Access: Private 
* ->Desc: handle following.
*/
exports.followingHandle = asyncErrHdl(async (req, res, next) => {
	const userId = req.userId;
	const followers_id = req.params.followers_id;
	
	const userProfile = await Profile.findOne({user: userId}).populate('user', ['name', 'email', 'avatar']);
	const followersProfile = await Profile.findOne({user : followers_id}).populate('user', ['name', 'email', 'avatar']);

	if(!userProfile) {
		return next(new errObj('No User Profile found to follow.', 404));
	};

	if(!followersProfile) {
		return next(new errObj('No followers profile found to follow.', 404));
	};

	const isFollowing = userProfile.following.filter(follower => follower.user_id.toString() === followers_id);

	if(isFollowing.length !== 0) {
		userProfile.following = userProfile.following.filter(follower => follower.user_id.toString() !== followers_id);
	} else {
		const followerObj = {
			user_id : followersProfile.user._id,
			name: followersProfile.user.name,
			avatar: followersProfile.user.avatar,
			location: followersProfile.location,
		};

		userProfile.following.unshift(followerObj);
	};

	const isFollower = followersProfile.followers.filter(follower => follower.user_id.toString() === userId);

	if(isFollower.length !== 0) {
		followersProfile.followers = followersProfile.followers.filter(follower => follower.user_id.toString() !== userId)
	} else {
		const followerObj = {
			user_id: userProfile.user._id, 
			name: userProfile.user.name, 
			avatar: userProfile.user.avatar, 
			location: userProfile.location,
		};

		followersProfile.followers.unshift(followerObj);
	}


	await userProfile.save();
	await followersProfile.save();

	res.json({
		userProfile,
	})
});


