import React from 'react';
import { NavLink } from 'react-router-dom';

function AuthLink({user, logout}) {
	const handleLogout = e => {
		e.preventDefault();
		logout();
	}
	return (
		<>
			<li className="nav-item">
				<NavLink exact activeClassName="active" to="/feeds" className="nav-link">Home</NavLink>
			</li>
			<li className="nav-item">
				<NavLink activeClassName="active" to={`/profile?user_id=${user ? user._id : null}&page=about`} className="nav-link">Profile</NavLink>
			</li>
			<li className="nav-item">
				<NavLink exact activeClassName="active" to="/dashboard" className="nav-link">Dashboard</NavLink>
			</li>
			<li className="nav-item">
				<NavLink exact onClick={(e) => handleLogout(e)} to="logout" className="nav-link text-danger">
					<i className="fas fa-sign-out-alt"></i> Logout
				</NavLink>
			</li>
		</>
	)
}

export default AuthLink