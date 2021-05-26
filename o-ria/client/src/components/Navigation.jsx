import React, { useState, useContext, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

import AuthLink from './nav/AuthLink';
import GuestLink from './nav/GuestLink';

function Navigation({show, status}) {
	const { loadUser, isAuthenticated, loading, logOut, user } = useContext(AuthContext);
	const year = new Date().getFullYear();
	const [toggle, setToggle] = useState(false);
	const click = () => {
		show();
		if(toggle) {
			setToggle(false)
		} else {
			setToggle(true);
		}
	};

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<nav>
			<div className="site-brand">
				<NavLink to="/">
					<span className="pre">O</span> <span className="post">RIA</span>
				</NavLink>
			</div>

			<button className="nav-toggler" onClick={click}>{toggle ? '-' : '+'}</button>

			<div className="site-nav">
					<ul className="site-nav">
						{!isAuthenticated && !loading ? <GuestLink /> : <AuthLink logOut={logOut} user={user} />}
					</ul>
			</div>	

			<footer className="copywrite">
				&copy; {year} <NavLink to="">O RIA</NavLink>
			</footer>
		</nav>
	)
}

export default Navigation