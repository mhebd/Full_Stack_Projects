import React, { useState, useContext, useEffect } from 'react';
import quiryString from 'query-string';

import { Link } from 'react-router-dom';

import ProfileContext from '../context/profile/ProfileContext';
import AuthContext from '../context/auth/AuthContext';

import UserMainInfo from '../components/profile/UserMainInfo';
import UserOthersInfo from '../components/profile/UserOthersInfo';
import UserPosts from '../components/profile/UserPosts';
import UserFollowing from '../components/profile/UserFollowing';
import UserFollowers from '../components/profile/UserFollowers';

import Spinner from '../components/common/Spinner';

function Prifile({location}) {
	const {user_id, page} = quiryString.parse(location.search);
	console.log(page)

	const [isLoading, setIsLoading] = useState(true);

	const { loading, getProfByUserId, profile } = useContext(ProfileContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		getProfByUserId(user_id);
	}, [user_id]);

	useEffect(() => {
		setIsLoading(loading);
	}, [loading])

	return (
		<>
			<div className="profile-wrap container py-4">
				{isLoading ? <Spinner /> : profile ? <div>
					<UserMainInfo profile={profile} page={page} />
					{ page && page === 'about' ? <UserOthersInfo profile={profile} /> : null }
					{ page && page === 'post' ? <UserPosts user_id={user_id} /> : null}
					{ page && page === 'following' ? <UserFollowing profile={profile} /> : null}
					{ page && page === 'followers' ? <UserFollowers profile={profile} /> : null}
 				</div> : <p className="lead">The user have not created a profile yet. {user &&  user._id === user_id ? <Link to="/dashboard/create-profile">Create a profile first</Link> : null } </p>}
				
			</div>
		</>
	)
}

export default Prifile