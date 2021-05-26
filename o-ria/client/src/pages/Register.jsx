import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/AlertContext';

function Register(props) {
	const { registerUser, error, isAuthenticated } = useContext(AuthContext);
	const { setAlert } =  useContext(AlertContext);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const { name, email, password, confirmPassword } = user;

	const onChange = e => setUser({...user, [e.target.name] : e.target.value});

	const onSubmit = e => {
		e.preventDefault();
		if(!name || !email || !password || !confirmPassword) {
			setAlert('All the fields are required.', 'danger')
		} else if(password.length < 6) {
			setAlert('Password must be at least 6 characters long.',  'danger');
		} else if(password !== confirmPassword) {
			setAlert('Your password and confirmPassword did not match.', 'danger')
		} else {
			registerUser(user);
		}
	};

	useEffect(() => {
		if(error.length > 0 && error[0] !== undefined) {
			error.forEach(err => setAlert(err.msg, 'danger'))
		};
		// eslint-disable-next-line
	}, [error]);


	useEffect(() => {
		if(isAuthenticated) {
			props.history.push('/');
		};
		// eslint-disable-next-line
	}, [isAuthenticated]);

	return (
		<div className="regiter-wrap row">
			<div className="col-md-8 mx-auto">
				<form className="form" onSubmit={onSubmit}>
					<h3 className="text-center mb-4 theme-color">Create A New Account.</h3>

					<div className="form-group mb-3">
						<label htmlFor="name">Your Name:</label>
						<input type="text" name="name" placeholder="Your Name" value={name} className="form-control" onChange={e => onChange(e)} />
					</div>
					
					<div className="form-group mb-3">
						<label htmlFor="email">Your Email:</label>
						<input type="email" name="email" placeholder="Your Email" value={email} className="form-control" onChange={e => onChange(e)} />
					</div>

					<div className="form-group mb-3">
						<label htmlFor="password">Your Password:</label>
						<input type="password" name="password" placeholder="Your Password" value={password} className="form-control" onChange={e => onChange(e)} autoComplete="true" />
					</div>
					
					<div className="form-group mb-3">
						<label htmlFor="confirmPassword">Confirm Your Password:</label>
						<input type="password" name="confirmPassword" placeholder="Confirm Your Password" value={confirmPassword} className="form-control" onChange={e => onChange(e)} autoComplete="true" />
					</div>
					
					<div className="form-group mb-3">
						<button type="submit" className="btn text-light theme-bg btn-block">Register Now</button>
					</div>

					<p className="lead">Already have an account? <Link className="theme-color" to="/login">Login Now</Link></p>
					
				</form>
			</div>
		</div>
	)
}

export default Register