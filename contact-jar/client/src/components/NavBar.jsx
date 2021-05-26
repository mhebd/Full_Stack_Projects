import React, { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext.jsx';

import AuthLink from './navComps/AuthLink.jsx';
import GuestLink from './navComps/GuestLink.jsx';

export default function NavBar() {
	const { isAuthenticated, logOut, user } = useContext(AuthContext);


	return (
		<>
			<nav className="navbar navbar-expand-md bg-info navbar-dark">
				<div className="container">
					<div className="navbar-brand">
						<a href="/" className="text-light">
							<i className="fas fa-id-card-alt"></i> Contact Jar
						</a>
					</div>

					<button className="navbar-toggler" data-toggle="collapse" data-target="#main_menu">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="main_menu">
						<ul className="navbar-nav ml-auto">
							{isAuthenticated ? 
								<AuthLink />
							 : 
							 <GuestLink />
							}
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}