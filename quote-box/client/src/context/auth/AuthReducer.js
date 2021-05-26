//Auth reducer  
const AuthReducer = (state,  action) => {
	switch (action.type) {
		case 'register':
		case 'login':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
			break;

		case 'loadUser':
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
			break;

		case 'logout':
			localStorage.removeItem('token');
			return {
				...state,
				error: [],
				isAuthenticated: false,
				loading: false,
				token: null,
				user: null,
			}
			break;

		case 'error':
			return {
				...state,
				error: [...state.error, action.payload],
				isAuthenticated: false,
				loading: false,
				token: null,
				user: null,
			}
			break;

		case 'removeErr':
			return {
				...state,
				error: [],
			}
			break;

		default:
			return {
				...state,
			}
			break;
	}
};

export default AuthReducer;