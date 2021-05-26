import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';

function Login(props) {
	const { setAlert } = useContext(AlertContext);
	const { login, error, isAuthenticated, loadUser } = useContext(AuthContext);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const {email, password,} = user;

	const onChange = e => setUser({
	 ...user, 
	 [e.target.name] :  e.target.value,
	});

	const submited = e => {
		e.preventDefault();
		if(!email || !password) {
			setAlert('All the fields  is mandatory.')
		} else if(password.length < 6) {
			setAlert('Password must be at least 6 characters.');
		} else {
			login({
				email,
				password,
			});
		}
	};

	useEffect(() => {
		if(error.length > 0) {
			error.forEach(err => setAlert(err, 'info'))
		};

		if(isAuthenticated) {
			props.history.push('/')
		}
	}, [error, isAuthenticated, props.history]);

	return (
		<>
			<div className="register-form-wrap py-5 row">
				<div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
					<h3 className="text-center text-danger mb-5">Login Your Profile</h3>

					<form className="form" onSubmit={submited}>
						<div className="form-group mb-3">
							<input type="email" name="email" placeholder="Your valid email" value={user.email} className="form-control" onChange={(e) => onChange(e)} />
						</div>	
						<div className="form-group mb-3">
							<input type="password" name="password" placeholder="Your password" value={user.password} className="form-control" onChange={(e) => onChange(e)} autoComplete="true" />
						</div>		
						<div className="form-group mb-3">
							<button type="submit" className="btn btn-danger btn-block">Login</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login