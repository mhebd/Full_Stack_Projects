import React, { useReducer } from 'react';
import PostContext from './PostContext';
import PostReducer from './PostReducer';
import axios from 'axios';

function PostState(props) {
	const initialState = {
		posts: null,
		post: null,
		error: null,
	};

	const [state, dispatch] = useReducer(PostReducer, initialState);

	//Get all post
	const getAllPost = async () => {
		try {
			const res = await axios('/api/post', {
				headers: {
					'content-type': 'application/json'
				}
			});
			dispatch({
				type: 'getAllPost',
				payload: res.data
			});
		} catch(err) {
			setError(err);
		}
	};

	//Create a new post
	const createPost = async post => {
		try {
			const res = await axios.post('/api/post', post, {
				headers: {
					'content-type': 'application/json'
				}
			});
			dispatch({
				type: 'createPost',
				payload: res.data,
			})
		} catch(err) {
			setError(err);
		}
	};

	//Get single post
	const getSinglePost = async (postId) => {
		try {
			const res = await axios(`/api/post/${postId}`);
			dispatch({
				type: 'singlePost', 
				payload: res.data,
			})
		} catch(err) {
			setError(err);
		}
	}

	//Handling like system 
	const handleLikes = async (post_id) => {
		try {
			const res = await axios.put(`/api/post/likes/${post_id}`);
			dispatch({
				type: 'likePost',
				payload: res.data,
			})
		} catch(err) {
			setError(err);
		}
	};

	//Create Comment
	const createComment = async (comment, post_id) => {
		try {
			const res = await axios.put(`/api/post/comments/${post_id}`, comment, {
				headers: {
					'content-type': 'application/json'
				}
			});
			dispatch({
				type: 'newComment', 
				payload: res.data,
			});
		} catch(err) {
			setError(err);
		}
	};

	//Delete a post
	const deletePost = async post_id => {
		try{
			const res = await axios.delete(`/api/post/${post_id}`);
			dispatch({
				type: 'deletePost',
				payload: res.data,
			})
		} catch(err) {
			setError(err);
		}
	}


	//Delete a comment
	const deleteComment = async (post_id, comment_id) => {
		try{
			const res = await axios.put(`/api/post/comments/${post_id}/${comment_id}`);
			console.log(res.data);
			dispatch({
				type: 'deleteComment',
				payload: res.data,
			})
		} catch(err) {
			setError(err);
		}
	}

	//Set error 
	const setError = err => {
		console.log(err.response.data)
		dispatch({
			type: 'error',
			payload: err.response.data.message,
		})
	}

	return (
		<PostContext.Provider value={{
			...state,
			getAllPost,
			createPost,
			getSinglePost,
			handleLikes,
			createComment,
			deletePost,
			deleteComment,
		}} >
			{props.children}
		</PostContext.Provider>
	)
}

export default PostState