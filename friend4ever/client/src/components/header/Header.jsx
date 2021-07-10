import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth/AuthContext';
import ProfileContext from '../../context/profile/ProfileContext';
import GuestLink from './GuestLink';
import AuthLink from './AuthLink';

import brandImg from '../../images/ancore.png';

export default function Header() {
	const { loadUser, user, isAuthenticated, loading, logOut } = useContext(AuthContext);
	const { loadProfile } = useContext(ProfileContext);

	useEffect(() => {
		loadUser();
	}, []);

	useEffect(() => {
		if(user) loadProfile();
	}, [user])

	return (
		<header>
			<nav className="navbar navbar-expand-md  navbar-light">
				<div className="container">
					<div className="navbar-brand">
						<NavLink to="/" className="text-light">
							<img src={brandImg} alt="" className="img-fluid brand-img" />
						</NavLink>
					</div>

					<button className="navbar-toggler" data-toggle="collapse" data-target="#main_menu">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="navbar-collapse collapse" id="main_menu">
						<ul className="navbar-nav ml-auto">
							{!isAuthenticated && !loading ? <GuestLink /> : <AuthLink user={user} logout={logOut} />}
							
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}