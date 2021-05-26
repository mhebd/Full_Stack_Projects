import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import ErrorContext from '../../context/error/ErrorContext.jsx';

function Register(props) {
	const { userRegister, error, clearError, isAuthenticated } = useContext(AuthContext);
	const { setError } =  useContext(ErrorContext);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = user;

	const onChangeHandler = e => setUser({ ...user, [e.target.name] : e.target.value });

	const onSubmitHandler = e => {
		e.preventDefault();

		if(!name || !email || !password) {
			setError('Please input all the fields.', 'danger');
		} else if(password !== password2) {
			setError('Your password didnot match.', 'danger')
		} else {
			userRegister({
				name,
				email,
				password,
			});
		}
	}

	useEffect(() =>{
		if(isAuthenticated) {
			props.history.push('/')
		};

		if(error) {
			setError(error, 'danger');
			clearError();
		}
	}, [error, isAuthenticated, props.history])

	return (
		<>
			<div className="register-wrap">
				<div className="row">
					<div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
						<h3 className="text-center text-info mb-4">Register Now</h3>
							<form onSubmit={(e) => onSubmitHandler(e)} className="form">
								<div className="form-group mb-3">
									<input type="text" name="name" className="form-control" value={user.name}  placeholder="Name" onChange={onChangeHandler} />
								</div>
								<div className="form-group mb-3">
									<input type="email" name="email" className="form-control" value={user.email}  placeholder="Email" onChange={onChangeHandler} />
								</div>
								<div className="form-group mb-3">
									<input type="password" name="password" className="form-control" value={user.password}  placeholder="Password" onChange={onChangeHandler} autoComplete="true" />
								</div>
								<div className="form-group mb-3">
									<input type="password" name="password2" className="form-control" value={user.password2}  placeholder="Confirm Password" onChange={onChangeHandler} autoComplete="true" />
								</div>
								<div className="form-groups">
									<button type="submit" className="btn btn-info btn-block">Register</button>
								</div>
							</form >
					</div>
				</div>
			</div>
		</>
	)
}

export default Register