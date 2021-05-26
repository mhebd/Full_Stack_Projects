import React from 'react';
import { NavLink } from 'react-router-dom';

function GuestLink() {
	return (
		<>
			<li className="nav-item">
				<NavLink exact activeClassName="active" to="/register" className="nav-link">Register</NavLink>
			</li>
			<li className="nav-item">
				<NavLink exact activeClassName="active" to="/login" className="nav-link">Login</NavLink>
			</li>
		</>
	)
}

export default GuestLink