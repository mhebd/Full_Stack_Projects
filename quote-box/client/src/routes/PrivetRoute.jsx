import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

function  PrivetRoute({ component: Component, ...rest }) {
	const { isAuthenticated, loading } = useContext(AuthContext);
	
	return (
		<Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/login" />) : (<Component {...props} />)  }  />
	)
}

export default PrivetRoute;