import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

function AuthLink({ logout }) {
	const {user} = useContext(AuthContext);
	const onClick = e => {
		e.preventDefault();
		logout();
	}
	return (
		<>
			<li className="nav-item">
				<NavLink exact activeClassName="active" to="/" className="nav-link">Hello, {user && user.name ? user.name : 'SomeOne'}</NavLink>
			</li>
			<li className="nav-item">
				<NavLink exact activeClassName="active" to="/about" className="nav-link">About</NavLink>
			</li>
			<li className="nav-item">
				<NavLink exact activeClassName="active" onClick={onClick} to="/logout" className="nav-link"><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
			</li>
		</>
	)
}

export default AuthLink