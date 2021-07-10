import React, { useContext, useEffect, useState } from 'react';
import queryString from 'query-string';

import PostContext from '../context/post/PostContext';
import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';

import PostCard from '../components/common/PostCard';
import CommentCard from '../components/common/CommentCard';
import CreateCommentForm from '../components/form/CreateCommentForm';
import Spinner from '../components/common/Spinner';

function SinglePost({match, location}) {
	const qsObj = queryString.parse(location.search);
	const [singlePost, setSinglePost] = useState(null);

	const { setAlert } = useContext(AlertContext);
	const { getSinglePost, post, handleLikes, deletePost, deleteComment } = useContext(PostContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		getSinglePost(qsObj.post_id);
	}, [qsObj.post_id]);

	useEffect(() => {
		if(post || post === null) setSinglePost(post)
	}, [post]);

	return (
		<div className="single-post-wrap container py-5">
			<div className="row">
				<div className="col-lg-8 col-md-10 mx-auto">
					<div className="mb-5">
						{singlePost === null ? <Spinner /> : <PostCard posts={singlePost} handleLikes={handleLikes} deletePost={deletePost} />}
					</div>
					<div className="mb-5">
						<h3 className="text-secondary">Leave A Comment.</h3>
						{singlePost !== null ? <CreateCommentForm postId={singlePost._id} /> : null}
					</div>
					<div className="comment-list-wrap">
						{singlePost === null ? null : singlePost.comments.map(comment => <CommentCard key={comment._id} comments={comment} deleteComment={deleteComment} post_id={qsObj.post_id} />)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SinglePost