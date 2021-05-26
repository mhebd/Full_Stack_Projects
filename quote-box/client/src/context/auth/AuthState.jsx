import React, {useReducer} from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setHeader from '../../utils/setHeader';
import axios from 'axios';

function AuthState(props) {
	const initialState = {
		token: localStorage.getItem('token') || null,
		isAuthenticated: null,
		loading: true,
		user : null,
		error: [],
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	//Register a new user
	const register = async user => {
		try {
			const res = await axios.post('/api/v1/users/register', user, {
				headers: {
					'content-type': 'application/json',
				}
			});
			dispatch({
				type: 'register',
				payload: res.data,
			});
		} catch(err) {
			dispatch({
				type: 'error',
				payload: err.response.data.message,
			});
			setTimeout(() => {
				dispatch({
					type: 'removeErr',
				})
			}, 5000)
		}
	}

	//Login a user
	const login = async user => {
		try {
			const res = await axios.post('/api/v1/users/login', user, {
				headers: {
					'content-type': 'application/json',
				}
			});
			dispatch({
				type: 'login',
				payload: res.data,
			});
		} catch(err) {
			dispatch({
				type: 'error',
				payload: err.response.data.message,
			});
			setTimeout(() => {
				dispatch({
					type: 'removeErr',
				})
			}, 5000)
		}
	}

	//Load user from server
	const loadUser = async () => {
		console.log('inside loadUser');
		if(localStorage.token) {
			setHeader(localStorage.token);
		}
		try {
			const res = await axios.get('/api/v1/users/profile');
			console.log('try ', res.data)
			dispatch({
				type: 'loadUser',
				payload: res.data,
			});
		} catch(err) {
			console.log('err ', err.response.data)
			dispatch({
				type: 'error',
				payload: err.response.data.message,
			});
			setTimeout(() => {
				dispatch({
					type: 'removeErr',
				})
			}, 5000)
		}
	};

	//Logout a user
	const logout = () => {
		dispatch({
			type: 'logout',
		})
	}

	return (
		<AuthContext.Provider value={{
			...state,
			register,
			login,
			loadUser,
			logout,
		}} >
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState