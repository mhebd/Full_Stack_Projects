import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';


function Login(props) {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const { setAlert } = useContext(AlertContext);
	const { loginUser, error, isAuthenticated } = useContext(AuthContext);

	const onChangeHandler = (e) => setUser({...user, [e.target.name] : e.target.value });

	const submitHandler = (e) => {
		e.preventDefault();
		
		if(!email || !password) {
			setAlert('All * marked fields are required.', 'warning');
		} else if(password.length < 6) {
			setAlert('Password must be at least 6 characters long.', 'warning');
		} else {
			loginUser(user);
		}
	};

	useEffect(() => {
		if(error) setAlert(error);
		//eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		if(isAuthenticated) {
			props.history.push('/feeds')
		}
		//eslint-disable-next-line
	}, [isAuthenticated]);

	return (
		<>
			<div className="login-wrap container py-5">
				<div className="row">
					<div className="col-md-8 col-sm-10 mx-auto py-5">
						<h3 className="theme-color">Login</h3>
						<h6 className="text-secondary">
							<i className="fas fa-user mr-3"></i>
							Login Your Account
						</h6>

						<form className="form pb-5" onSubmit={submitHandler}>
							<div className="form-group mb-3">
								<label htmlFor="email">Your Valid Email :</label>
								<input type="email" className="form-control" name="email" placeholder="* Your Valid Email..." value={email} onChange={(e) => onChangeHandler(e)} />
							</div>
							<div className="form-group mb-3">
								<label htmlFor="password">Type Your Password :</label>
								<input type="password" className="form-control" id="password" name="password" placeholder="* Type Your Password..." value={password} onChange={(e) => onChangeHandler(e)} autoComplete="true" />
							</div>
							<div className="form-group mb-3">
								<p className="lead">Not have an account? <a href="/register" className="theme-color">Sign Up Here</a></p>
							</div>
							<div className="form-group">
								<button className="ff-btn" type="submit">Login Now</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login