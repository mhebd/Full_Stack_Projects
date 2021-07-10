import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/auth/AuthContext';

function Landing(props) {
	const { isAuthenticated, error } = useContext(AuthContext);

	useEffect(() => {
		if(isAuthenticated) {
			props.history.push('/feeds')
		}
		//eslint-disable-next-line
	}, [isAuthenticated]);

	return (
		<div className="landing-wrap text-light p-3 text-center">
			<h1>FRIENDS <span className="theme-color logo-sc"> <i style={{color: '#fc5404'}} className="fas fa-hands-helping"></i> </span> FOREVER</h1>
			<p className="lead">Create Your Profile, Share Post, Teach Others And Learn Together...</p>
			<div className="btns mt-3">
				<Link to="/register" className="ff-btn mr-4">Create Account</Link>
			 <Link to="/login" className="ff-btn">Login Now</Link>
			</div>
		</div>
	)
}

export default Landing