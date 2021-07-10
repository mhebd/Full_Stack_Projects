import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';

function Register(props) {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { name, email, password, confirmPassword } = user;

	const { setAlert } = useContext(AlertContext);
	const { registerUser, error, isAuthenticated } = useContext(AuthContext);

	const onChangeHandler = (e) => setUser({...user, [e.target.name] : e.target.value });

	const submitHandler = (e) => {
		e.preventDefault();

		if(!name || !email || !password || !confirmPassword) {
			setAlert('All * marked fields is requires.', 'warning');
		} else if(password.length < 6) {
			setAlert('Password must be at least 6 characters long.', 'warning');
		} else if(password !== confirmPassword) {
			setAlert('Password and confirm password do not match.', 'warning');
		} else {
			registerUser(user);
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
	}, [isAuthenticated])

	return (
		<>
			<div className="register-wrap container">
				<div className="row">
					<div className="col-md-8 col-sm-10 mx-auto py-5">
						<h3 className="theme-color">Sign Up</h3>
						<h6 className="text-secondary">
							<i className="fas fa-user mr-3"></i>
							Create New Account
						</h6>

						<form className="form mt-4" onSubmit={submitHandler}>
							<div className="form-group mb-3">
								<label htmlFor="name">Your Full Name :</label>
								<input type="text" className="form-control" name="name" placeholder="* Your Full Name..." value={name} onChange={(e) => onChangeHandler(e)} />
							</div>
							<div className="form-group mb-3">
								<label htmlFor="email">Your Valid Email :</label>
								<input type="email" className="form-control" name="email" placeholder="* Your Valid Email..." value={email} onChange={(e) => onChangeHandler(e)} />
							</div>
							<div className="form-group mb-3">
								<label htmlFor="password">Type Your Password :</label>
								<input type="password" className="form-control" id="password" name="password" placeholder="* Type Your Password..." value={password} onChange={(e) => onChangeHandler(e)} autoComplete="true" />
							</div>
							<div className="form-group mb-3">
								<label htmlFor="confirmPassword">Confirm Your Passwrod :</label>
								<input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="* Confirm Your Password..." value={confirmPassword} onChange={(e) => onChangeHandler(e)} autoComplete="true" />
							</div>
							<div className="form-group mb-3">
								<p className="lead">Already have an account? <a href="/login" className="theme-color">Login Now</a></p>
							</div>
							<div className="form-group">
								<button className="ff-btn" type="submit">Create Account</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Register