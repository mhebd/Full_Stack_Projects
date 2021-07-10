
const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'registerUser':
		case 'loginUser':
			localStorage.setItem('token', action.payload.token);
			return {
				...state, 
				isAuthenticated: true,
				loading: false,
				...action.payload,
				error: null,
			};
			break;

		case 'loadUser': 
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				error: null,
				...action.payload,
			}


		case 'error': 
		case 'logOut':
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false, 
				loading: false,
				user: null, 
				token: null, 
				error: action.payload,
			};
			break;

		default:
			return {
				...state
			};
			break;
	}
};

export default AuthReducer;