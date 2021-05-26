
const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'loginSuccess':
		case 'registerSuccess':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				loading: false,
				isAuthenticated: true,
			};
			// eslint-disable-next-line
			break;

		case 'loadUserSuccess':
			return {
				...state,
				...action.payload,
				loading: false,
				isAuthenticated: true,
			};
			// eslint-disable-next-line
			break;

		case 'error':
		case 'logout':
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				token: null,
				user: null,
				error: [...state.error, action.payload],
			};
			// eslint-disable-next-line
			break;

		case 'removeError':
			return {
				...state,
				error: state.error.filter(err => err.id !== action.payload),
			};
			// eslint-disable-next-line
			break;

		default:
			return {
				...state,
			};
			// eslint-disable-next-line
			break;
	}
};

export default AuthReducer;