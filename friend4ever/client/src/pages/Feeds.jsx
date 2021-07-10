import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PostContext from '../context/post/PostContext';
import AlertContext from '../context/alert/AlertContext';
import ProfileContext from '../context/profile/ProfileContext';

import CreatePostForm from '../components/form/CreatePostForm';
import PostCard from '../components/common/PostCard';
import UserCard from '../components/common/UserCard';
import Spinner from '../components/common/Spinner';

function Feeds() {
	const [allPosts, setAllPosts] = useState(null);
	const [allProfies, setAllProfiles] = useState(null);

	const { setAlert } = useContext(AlertContext);
	const { getAllPost, posts, handleLikes, deletePost } = useContext(PostContext);
	const { myProfile, getProfiles, profiles } = useContext(ProfileContext);

	useEffect(() => {
		if(myProfile) getAllPost(myProfile);
		getProfiles();
	}, [myProfile]);

	useEffect(() => {
		setAllProfiles(profiles);
	}, [profiles])

	useEffect(() => {
		setAllPosts(posts);
	}, [posts]);



	return (
		<div className="post-feeds-wrap container py-5">
			<div className="row">
				<div className="col-md-8">
					<h2 className="theme-color">Post Feeds</h2>
					<h6 className="text-secondary">
						<i className="fas fa-user mr-3"></i>
						Users New Posts
					</h6>
					<div className="create-post-wrap my-5">
						{myProfile ? <CreatePostForm /> : <p className="lead">You have not created a profile yet. <Link to="/dashboard/create-profile">Create a profile first</Link></p>}
					</div>
					<div className="d-md-none">
						<div className="users-wrap-phone d-none mb-3">
							{allProfies ? allProfies.map(profile => <UserCard key={profile._id} profile={profile} />) : <Spinner />}
						</div>
					</div>
					<div className="posts-wrap">
						{allPosts === null ? <Spinner /> :  allPosts.length === 0 ? 'There is no post found. Follow some profiles to get their post.' : allPosts.map(post => <PostCard key={post._id} posts={post} handleLikes={handleLikes} deletePost={deletePost} />)}
					</div>
				</div>

				<div className="col-md-4 d-none d-md-block mb-4">
					<h2 className="theme-color mb-4">User List</h2>
					<div className="users-wrap">
						{allProfies ? allProfies.map(profile => <UserCard key={profile._id} profile={profile} />) : <Spinner />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Feeds