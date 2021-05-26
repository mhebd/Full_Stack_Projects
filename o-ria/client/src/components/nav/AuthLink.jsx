import React from 'react';
import { NavLink } from 'react-router-dom';

function AuthLink({logOut, user}) {
	return (
		<>
			<li className="site-nav-item">
				<NavLink exact to="/" activeClassName="active" className="site-nav-link">Hello, {user && user.name ? user.name : 'SomeOne'}</NavLink>
			</li>
			<li className="site-nav-item">
				<NavLink exact to="/about" activeClassName="active" className="site-nav-link">About</NavLink>
			</li>
			<li className="site-nav-item">
				<NavLink exact to="/create-person" activeClassName="active" className="site-nav-link">Create Person</NavLink>
			</li>
			<li className="site-nav-item">
				<NavLink exact to="/logout" activeClassName="active" className="site-nav-link" onClick={logOut} >Logout</NavLink>
			</li>
		</>
	)
}

export default AuthLink