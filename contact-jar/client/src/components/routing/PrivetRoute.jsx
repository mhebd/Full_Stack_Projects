import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext.jsx';

function PrivetRoute({ component : Component, ...rest }) {
	const { isAuthenticated, loading, loadUser } = useContext(AuthContext);
	useEffect(() => {
		if(localStorage.TOKEN !== null) {
			loadUser();
		}
	}, [])
	return (
		<Route 
			{...rest} 
			render={props =>  !isAuthenticated && !loading ? 
			(<Redirect to='/login' />
				) : (
				<Component {...props} />) }
		/>
	)
}

export default PrivetRoute;