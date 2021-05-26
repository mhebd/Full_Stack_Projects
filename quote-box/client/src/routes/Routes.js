import React, {useContext, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivetRoute from './PrivetRoute';


import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import NotFoud from '../pages/NotFound';

function Routes() {
	return (
		<div className="container">
			<Switch>
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<PrivetRoute exact path="/about" component={About} />
				<PrivetRoute exact path="/" component={Home} />
				<Route component={NotFoud} />
			</Switch>
		</div>
	)
}

export default Routes;