const asyncErrHdl = require('../util/asyncErrHand');
const errObj = require('../util/errObj');
const Post = require('../models/Post');
const User =  require('../models/User');
const Profile = require('../models/Profile');


/**
* @POST 
* ->Route: /api/post
* ->Access: Private
* ->Desc: Create a new psot...
*/
exports.createPost = asyncErrHdl(async (req, res, next) => {
	const { post } = req.body;
	const userId = req.userId;

	const user = await User.findById(userId);

	const newPost = await Post.create({
		post,
		userName: user.name,
		userAvatar: user.avatar,
		user: userId,
	});

	res.json({
		post: newPost,
	})
});




/**
* @GET 
* ->Route: /api/post
* ->Access: Private
* ->Desc: Get all post..
*/
exports.allPosts = asyncErrHdl(async (req, res, next) => {
	const userId = req.userId;

	const profile =  await Profile.findOne({ user : userId });

	if(!profile) {
		return next(new errObj('Please create a profile first.', '400'));
	};

	const following = profile.following;

	const posts = await Post.find().sort('-created');

	const filteredPost = posts.filter(post => following.filter(follower => follower.user_id.toString() === post.user.toString()).length > 0 || post.user.toString() === userId ? post : null );

	res.json({
		posts: filteredPost,
	})
});



/**
* @GET 
* ->Route: /api/post/:post_id
* ->Access: Private 
* ->Desc: Get a single post...
*/
exports.singlePost = asyncErrHdl(async (req, res, next) => {
	const id = req.params.post_id;

	const post = await Post.findById(id);

	if(!post) {
		return next(new errObj('No post found with this id.', 404));
	};

	res.json({
		post,
	})
});



/**
* @DELETE 
* ->Route: /api/post/:post_id
* ->Access: Private
* ->Desc: Delete a post... 
*/
exports.deletePost = asyncErrHdl(async (req, res, next) => {
	const id =  req.params.post_id;
	const user = req.userId;

	const post =  await Post.findById(id);

	if(!post) {
		return next(new errObj('No post found with this id to delete.', 404));
	};

	if(post.user.toString() !== user) {
		return next(new errObj('You are not allowed to delete this post.', 401));
	};

	await Post.findByIdAndDelete(id);

	res.json({
		post,
	})
});


/**
* @GET 
* ->Route: /api/post/user/:user_id
* ->Access: Private
* ->Desc: Get all post by a specific user....
*/
exports.userPosts = asyncErrHdl(async (req, res, next) => {
	const user = req.params.user_id;

	const posts = await Post.find({ user }).sort('-created');

	res.json({
		posts,
	})
});



/**
* @PUT 
* ->Route: /api/post/likes/:post_id
* ->Access: Private
* ->Desc: Add a like....
*/
exports.addLike = asyncErrHdl(async (req, res, next) => {
	const id = req.params.post_id;
	const user = req.userId;

	let post =  await Post.findById(id);

	if(!post) {
		return next(new errObj('No post found to like.', 404));
	};

	if(!post.likes.includes(user)) {
		post.likes.push(user);
	} else {
		post.likes = post.likes.filter(id => id !== user);
	};

	await post.save();

	res.json({
		post,
	})
});



/**
* @PUT 
* ->Route: /api/post/comments/:post_id
* ->Access: Private
* ->Desc: Add a comment....
*/
exports.addComment = asyncErrHdl(async (req, res, next) => {
	const id = req.params.post_id;
	const userId = req.userId;
	const { comment } = req.body;

	let post =  await Post.findById(id);

	if(!post) {
		return next(new errObj('No post found to like.', 404));
	};

	const user = await User.findById(userId);

	const commentObj = {
		comment,
		userName: user.name,
		userAvatar: user.avatar,
		user: userId,
	}

	post.comments.unshift(commentObj);

	await post.save();

	res.json({
		post,
	})
});



/**
* @PUT 
* ->Route: /api/post/comments/:post_id/:comment_id
* ->Access: Private
* ->Desc: Remove a comment....
*/
exports.removeComment = asyncErrHdl(async (req, res, next) => {
	const postId = req.params.post_id;
	const commentId = req.params.comment_id;
	const userId = req.userId;

	let post =  await Post.findById(postId);

	if(!post) {
		return next(new errObj('No post found to delete comment.', 404));
	};

	const findComment = post.comments.filter(comment => comment._id.toString() === commentId)[0];

	if(!findComment) {
		return next(new errObj('No comment found to delete comment.', 404));
	};

	if(findComment.user.toString() !== userId) {
		return next(new errObj('You are not allowed to delete this comment', 401));
	};

	post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);

	await post.save();

	res.json({
		post,
	})
});
