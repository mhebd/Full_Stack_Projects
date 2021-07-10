import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

function PrivateRoute({component: Component, ...rest}) {
	const { loading, isAuthenticated } = useContext(AuthContext);
	return (
		<Route 
			{...rest} 
			render={props => !isAuthenticated && !loading ? (
					<Redirect to="/" />
				) : (
					<Component {...props} />
				)}
		/>
	)
}

export default PrivateRoute