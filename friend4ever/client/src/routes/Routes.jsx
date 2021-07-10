import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Landing from '../pages/Landing';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SinglePost from '../pages/SinglePost';
import Feeds from '../pages/Feeds';
import DashBoard from '../pages/DashBoard';
import CreateProfile from '../pages/CreateProfile';
import AddExperience from '../pages/AddExperience';
import AddEducation from '../pages/AddEducation';
import NotFound from '../pages/NotFound';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			<PrivateRoute exact path="/profile" component={Profile} />
			<PrivateRoute exact path="/single-post" component={SinglePost} />
			<PrivateRoute exact path="/feeds" component={Feeds} />
			<PrivateRoute exact path="/dashboard" component={DashBoard} />
			<PrivateRoute exact path="/dashboard/create-profile" component={CreateProfile} />
			<PrivateRoute exact path="/dashboard/add-experience" component={AddExperience} />
			<PrivateRoute exact path="/dashboard/add-education" component={AddEducation} />
			<Route exact path="/" component={Landing} />
			<Route component={NotFound} />
		</Switch>
	)
}