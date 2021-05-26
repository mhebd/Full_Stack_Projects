import React, { useReducer } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setHeader from '../../utils/setHeader';

function AuthState(props) {
	const initialState = {
		isAuthenticated: null,
		loading: true,
		token: localStorage.getItem('token'),
		user: null,
		error: [],
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState)

	//Register a new user
	const registerUser = async user => {
		try {
			const res = await axios.post('/api/v1/user/register', user, {
				headers : {
					'content-type': 'application/json',
				}
			});
			dispatch({
				type: 'registerSuccess',
				payload: res.data,
			});
			loadUser();
		} catch(err) {
			setError(err);
		}
	}

	//Login a existing user
	const loginUser = async user => {
		try {
			const res = await axios.post('/api/v1/user/login', user, {
				headers : {
					'content-type': 'application/json',
				}
			});
			dispatch({
				type: 'loginSuccess',
				payload: res.data,
			});
			loadUser();
		} catch(err) {
			setError(err)
		}
	};

	//Load a existing user
	const loadUser = async token => {
		if(localStorage.token) {
		  setHeader(localStorage.token);
		}

		try {
			const res = await axios.get('/api/v1/user');
			console.log(res.data)
			dispatch({
				type: 'loadUserSuccess',
				payload: res.data,
			});
		} catch(err) {
			setError(err)
		}
	};

	//LogOut user  
	const logOut = () => {
		localStorage.removeItem('token');
		dispatch({
			type: 'logout',
		})
	};

	//Error handler
	const setError = err => {
		const id = uuidv4();
		dispatch({
			type: 'error',
			payload: {
				id,
				msg: err.response.data.message,
			}
		});
		setTimeout(() => {
			dispatch({
				type: 'removeError',
				payload: id,
			})
		}, 5000)
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