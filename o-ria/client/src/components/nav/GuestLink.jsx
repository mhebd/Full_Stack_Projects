import React from 'react';
import { NavLink } from 'react-router-dom';

function GuestLink() {
	return (
		<>
			<li className="site-nav-item">
				<NavLink exact to="/register" activeClassName="active" className="site-nav-link">Sign Up</NavLink>
			</li>
			<li className="site-nav-item">
				<NavLink exact to="/login" activeClassName="active" className="site-nav-link">Login</NavLink>
			</li>
		</>
	)
}

export default GuestLink