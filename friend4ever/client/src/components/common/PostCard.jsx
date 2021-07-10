import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import he from 'he';

import AuthContext from '../../context/auth/AuthContext';

function PostCard({posts, handleLikes, deletePost}) {
	const { post, userName, userAvatar, user, likes, comments, created, _id } = posts;

	const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

	const authContext = useContext(AuthContext);
	const userId = authContext.user ? authContext.user._id : null;
	return (
		<div className="post-card dbc card mb-4">
			{authContext.user ? (user.toString() === authContext.user._id.toString() ? <button onClick={() => deletePost(_id)} className="db">X</button> : null) : null}
			<div className="card-body">
				<div className="post-owner-info d-flex">
					<Link to={`/profile?user_id=${user}&page=about`} >
						<img src={`https:${userAvatar}`} alt={userName} className="post-owner-img img-fluid mr-3" />
					</Link>
					<div className="">
						<h6 className="post-owner-name">
							<Link to={`/profile?user_id=${user}&page=about`} className="theme-color font-weight-bold text-uppercase" >{userName}</Link>
						</h6>
						<p className="small posted-date">{new Date(created).toDateString()}</p>
					</div>
				</div>
				<hr />
				<div className="post-body lead">
					{renderHTML(post)}
				</div>
			</div>
			<div className="card-footer post-btns">
				<div className="row">
					<div className="col-6">
						<button className={`btn-block btn ${likes.includes(userId) ? 'theme-color' : ''}`} onClick={() => handleLikes(_id)}>
							<i className="fas fa-thumbs-up"></i> {likes.includes(userId) ? 'Liked' : 'Like'} <span className="badge badge-light">{likes.length}</span>
						</button>
					</div>
					<div className="col-6">
						<Link to={`/single-post?post_id=${_id}`} className="btn-block btn text-dark">
							<i className="fas fa-comment"></i> Comments <span className="badge badge-light">{comments.length}</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostCard