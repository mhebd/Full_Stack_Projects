import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/AlertContext';

function Login(props) {
	const { loginUser, error, isAuthenticated } = useContext(AuthContext);
	const { setAlert } =  useContext(AlertContext);

	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const { email, password } = user;

	const onChange = e => setUser({...user, [e.target.name] : e.target.value});

	const onSubmit = e => {
		e.preventDefault();
		if(!email || !password) {
			setAlert('All the fields are required.', 'danger')
		} else if(password.length < 6) {
			setAlert('Password must be at least 6 characters long.',  'danger');
		} else {
			loginUser(user);
		}
	};

	useEffect(() => {
		if(error.length > 0 && error[0] !== undefined) {
			error.forEach(err => err.msg ? setAlert(err.msg, 'danger') : null);
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
					<h3 className="text-center mb-4 theme-color">Login Your Account.</h3>
					
					<div className="form-group mb-3">
						<label htmlFor="email">Your Email:</label>
						<input type="email" name="email" placeholder="Your Email" value={email} className="form-control" onChange={e => onChange(e)} />
					</div>

					<div className="form-group mb-3">
						<label htmlFor="password">Your Password:</label>
						<input type="password" name="password" placeholder="Your Password" value={password} className="form-control" onChange={e => onChange(e)} autoComplete="true" />
					</div>
					
					<div className="form-group mb-3">
						<button type="submit" className="btn text-light theme-bg btn-block">Login Now</button>
					</div>

					<p className="lead">Not a user? <Link className="theme-color" to="/register">Sign Up Now</Link></p>
					
				</form>
			</div>
		</div>
	)
}

export default Login