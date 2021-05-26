import React, { useReducer } from 'react';
import AuthContext from './AuthContext.jsx';
import AuthReducer from './AuthReducer.jsx';
import setHeader from '../../utils/setHeader.js';
import axios from 'axios';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('TOKEN'),
		isAuthenticated: null,
		login: null,
		loading: false,
		user: null,
		error: null,
	};


	const [state, dispatch] = useReducer(AuthReducer, initialState);

	//User Register
	const userRegister = async user => {
		try {
			const res = await axios.post('/api/v1/users', user, {
				headers : {
					'content-type' : 'application/json',
				}
			});
			dispatch({
				type : 'register-success',
				payload : res.data,
			});
			loadUser();
		} catch (err) {
			dispatch({
				type : 'register-fail',
				payload : err.response.data.message,
			})
		}
	};

	//Login User  
	const loginUser = async user => {
		try {
			const res = await axios.post('/api/v1/auth', user, {
				headers : {
					'content-type' : 'application/json',
				}
			});
			dispatch({
				type : 'login-success',
				payload : res.data,
			});
			loadUser();
		} catch (err) {
			dispatch({
				type : 'login-fail',
				payload : err.response.data.message,
			})
		}
	};

	//Load User
	const loadUser = async () => {
		try {
			const res = await axios('/api/v1/users');
			dispatch({
				type: 'loadUser',
				payload: res.data,
			})
		} catch(err) {
			dispatch({
				type: 'loadUser-fail',
				payload: err.response.data.message,
			})
		}
	}

	//Logout User  
	const logOut = () => {
		dispatch({
			type : 'logOut',
		})
	}

	//Clear Error
	const clearError =  () => { 
		dispatch({
			type : 'clearError',
		})
	}

	return (
		<AuthContext.Provider value={{
			...state,
			userRegister,
			clearError,
			loadUser,
			loginUser,
			logOut,
		}} >
			{props.children}
		</AuthContext.Provider>
	)
};

export default AuthState;