const express =  require('express');
const { 
	createPost, 
	allPosts, 
	singlePost,
	deletePost, 
	userPosts, 
	addLike, 
	addComment, 
	removeComment 
} = require('../controller/postController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/').post(auth, createPost).get(auth, allPosts);
router.route('/:post_id').get(auth, singlePost).delete(auth, deletePost);
router.route('/user/:user_id').get(auth, userPosts);
router.route('/likes/:post_id').put(auth, addLike);
router.route('/comments/:post_id').put(auth, addComment);
router.route('/comments/:post_id/:comment_id').put(auth, removeComment);

module.exports = router;