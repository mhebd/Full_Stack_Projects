import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AlertReducer from './AuthReducer';
import axios from 'axios';
import setHeader from '../../utils/setHeader';

function AuthState(props) {
	const initialState = {
		isAuthenticated: null, 
		loading: true,
		user: null, 
		token: localStorage.getItem('token'),
		error: null,
	};

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	//Register a user
	const registerUser = async user => {
		try {
			const res =  await axios.post('/api/user/register', user, {
				headers: {
					'content-type': 'application/json',
				}
			});
			dispatch({
				type: 'registerUser',
				payload: res.data,
			});
			loadUser();
		} catch (err) {
			setError(err);
		}
	};


	//Login a user
	const loginUser = async user => {
		try {
			const res =  await axios.post('/api/user/login', user, {
				headers: {
					'content-type': 'application/json',
				}
			});
			dispatch({
				type: 'loginUser',
				payload: res.data,
			});
			loadUser();
		} catch (err) {
			setError(err);
		}
	};

	//Load user 
	const loadUser = async () => {
		//Set token in header
		if(localStorage.token) {
			setHeader(localStorage.token);
		};

		//Get user from server
		try{
			const res = await axios('/api/user/me', {
				headers: {
					'content-type': 'application/json',
				}
			});
			dispatch({
				type: 'loadUser', 
				payload: res.data,
			})
		} catch (err) {
			setError(err);
		}
	};

	//Sign out a user 
	const logOut = async () => {
		try {
			dispatch({
				type: 'logOut',
			})
		} catch (err) {
			setError(err);
		}
	}


	//Set error in the state
	const setError = err => {
		dispatch({
			type: 'error',
			payload: err.response.data.message,
		})
	}

	return (
		<AuthContext.Provider value={{
			...state,
			registerUser,
			loginUser,
			loadUser,
			logOut,
		}} >
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState