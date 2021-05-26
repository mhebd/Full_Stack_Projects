import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivetRoute from '../utils/PrivetRoute';

import Home from '../pages/Home';
import About from '../pages/About';
import Person from '../pages/Person';
import CreatePerson from '../pages/CreatePerson';
import UpdatePerson from '../pages/UpdatePerson';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Notfound from '../pages/Notfound';

function Routes() {
	return (
		<Switch>
			<Route exact path="/register" component={Register}  />
			<Route exact path="/login" component={Login}  />
			<PrivetRoute exact path="/about" component={About}  />
			<PrivetRoute exact path="/person/:id" component={Person}  />
			<PrivetRoute exact path="/create-person" component={
				CreatePerson}  />
			<PrivetRoute exact path="/update-person" component={
				UpdatePerson}  />
			<PrivetRoute exact path="/" component={Home}  />
			<PrivetRoute component={Notfound} />
		</Switch>
	)
}

export default Routes