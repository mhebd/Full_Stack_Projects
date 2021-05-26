import React, {useContext, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';


import AuthLink from '../components/nav/AuthLink';
import GuestLink from '../components/nav/GuestLink';

function Navigation() {
	const { isAuthenticated, logout, loadUser } = useContext(AuthContext);

	useEffect(() => {
		loadUser();
		console.log('From navbar')
	}, [])

	return (
		<header>
			<nav className="navbar navbar-expand-md bg-danger navbar-dark">
				<div className="container">
					<div className="navbar-brand">
						<NavLink to="/" className="text-light">Quote Box</NavLink>
					</div>

					<button className="navbar-toggler" data-toggle="collapse" data-target="#main_menu">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="navbar-collapse collapse">
						<ul className="navbar-nav ml-auto">
							{isAuthenticated ? <AuthLink logout={logout} /> : <GuestLink />}
						</ul>
					</div>	
				</div>
			</nav>
		</header>
	)
}

export default Navigation;