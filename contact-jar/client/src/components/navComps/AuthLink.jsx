import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext.jsx';


function AuthLink() {
	const { isAuthenticated, logOut, user } = useContext(AuthContext);

	return (
		<>
			<li className="nav-item">
				<NavLink exact activeClassName="active" to="/" className="nav-link">Hello, {user && user.name}</NavLink>
			</li>
			<li className="nav-item">
				<NavLink exact activeClassName="active" to="/about" className="nav-link">About</NavLink>
			</li>
			<li className="nav-item">
				<NavLink to="/logout" className="nav-link" onClick={logOut} ><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
			</li>
		</>
	)
}

export default AuthLink