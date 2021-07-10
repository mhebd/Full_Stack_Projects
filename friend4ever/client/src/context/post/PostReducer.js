
const PostReducer = (state, action) => {
	switch (action.type) {
		case 'getAllPost':
			return {
				...state, 
				...action.payload,
			};
			break;

		case 'createPost':
			return {
				...state,
				posts: [action.payload.post, ...state.posts],
				error: null,
			};
			break;

		case 'deletePost': 
			return {
				...state,
				posts: state.posts && state.posts.filter(post => post._id !== action.payload.post._id),
				post: null,
			};
			break;

		case 'likePost':
			return {
				...state,
				posts: state.posts && state.posts.map(post => post._id === action.payload.post._id ? {...post, likes : action.payload.post.likes} : post),
				post: state.post && state.post._id === action.payload.post._id ? {...state.post, likes: action.payload.post.likes} : state.post,
			};
			break;

		case 'newComment':
			return {
				...state,
				post: state.post && state.post._id === action.payload.post._id ? {...state.post, comments: action.payload.post.comments} : state.post,
			};
			break;

		case 'deleteComment': 
			return {
				...state,
				post: state.post && state.post._id === action.payload.post._id ? {...state.post, comments: action.payload.post.comments} : state.post,
			};
			break;

		case 'singlePost': 
			return {
				...state,
				...action.payload
			};
			break;

		default:
			return {
				...state
			};
			break;
	}
};

export default PostReducer;