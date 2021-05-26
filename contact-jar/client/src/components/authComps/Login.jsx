import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import ErrorContext from '../../context/error/ErrorContext.jsx';

function Login(props) {
	const { loginUser, error, clearError, isAuthenticated } = useContext(AuthContext);
	const { setError } =  useContext(ErrorContext);

	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

	const {email, password} = login;

	const onChangeHandler = e => setLogin({ ...login, [e.target.name] : e.target.value });

	const onSubmitHandler = e => {
		e.preventDefault();
		if(!email || !password) {
			setError('Please input your email and password.', 'danger');
		} else {
			loginUser({
				email,
				password,
			})
		}
	};

	useEffect(() =>{
		if(isAuthenticated) {
			props.history.push('/')
		};

		if(error) {
			setError(error, 'danger');
			clearError();
		}
	}, [error, isAuthenticated, props.history]);

	return (
		<>
			<div className="Login-wrap">
				<div className="row">
					<div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
						<h3 className="text-center text-info mb-4">Login Now</h3>
							<form onSubmit={(e) => onSubmitHandler(e)} className="form">
								<div className="form-group mb-3">
									<input type="email" name="email" className="form-control" value={login.email}  placeholder="Email" onChange={onChangeHandler} />
								</div>
								<div className="form-group mb-3">
									<input type="password" name="password" className="form-control" value={login.password} placeholder="Password" onChange={onChangeHandler} autoComplete="true" />
								</div>
								<div className="form-groups">
									<button type="submit" className="btn btn-info btn-block">Login</button>
								</div>
							</form >
					</div>
				</div>
			</div>
		</>
	)
}

export default Login;