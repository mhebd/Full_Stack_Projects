import React, { useContext, useEffect, useState } from 'react';

import PostContext from '../../context/post/PostContext';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

import PostCard from '../common/PostCard';

function UserPosts(props) {
	const [allPosts, setAllPosts] = useState(null);

	const { setAlert } = useContext(AlertContext);
	const { getAllPost, posts, handleLikes, deletePost } = useContext(PostContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		getAllPost();
	}, [user]);

	useEffect(() => {
		if(posts) {
			const userPost = posts.filter(post => post.user.toString() === props.user_id)
			setAllPosts(userPost);
		}
	}, [posts]);

	return (
		<div className="user-posts-wrap">
			<div className="card py-4">
				<div className="card-body">
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
							{allPosts === null ? 'loading...' :  allPosts.length === 0 ? 'There is no post found.' : allPosts.map(post => <PostCard key={post._id} posts={post} handleLikes={handleLikes} deletePost={deletePost} />)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserPosts