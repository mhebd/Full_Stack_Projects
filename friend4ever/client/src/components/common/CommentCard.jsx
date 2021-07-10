import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/AuthContext';

function CommentCard({comments, deleteComment, post_id}) {
	const { comment, userName, userAvatar, user, _id, created } = comments;

	const authContext = useContext(AuthContext);
	return (
		<div className="comment-card dbc card mb-4">
			{user.toString() === authContext.user._id.toString() ? <button onClick={() => deleteComment(post_id, _id)} className="db">X</button> : null}
			<div className="card-body">
				<div className="comment-owner-info d-flex">
					<Link to={`/profile?user_id=${user}&page=about`} >
						<img src={`https:${userAvatar}`} alt={userName} className="post-owner-img img-fluid mr-3" />
					</Link>
					<div className="">
						<Link to={`/profile?user_id=${user}&page=about`} className="theme-color font-weight-bold text-uppercase" >{userName}</Link>
						<p className="small commented-date">{new Date(created).toDateString()}</p>
					</div>
				</div>
				<hr />
				<div className="comment-body lead">
					{comment}
				</div>
			</div>
		</div>
	)
}

export default CommentCard