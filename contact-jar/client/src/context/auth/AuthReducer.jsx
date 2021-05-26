const AuthReducer = (state, action) => {
	switch(action.type) {
		case 'register-success':
		case 'login-success':
			localStorage.setItem('TOKEN', action.payload.token);
			return {
				...state,
				isAuthenticated: true,
				loading: true,
				...action.payload,
			}
			break;

		case 'loadUser':
			return {
				...state,
				...action.payload,
				loading: true,
				isAuthenticated: true,
			}
			break;

		case 'register-fail':
		case 'loadUser-fail':
		case 'login-fail':
		case 'logOut':
			localStorage.setItem('TOKEN', null)
			return {
				...state,
				isAuthenticated : false,
				loading: false,
				error :  action.payload,
				user : null,
				token : null,
			}
			break;

		case 'clearError':
			return {
				...state,
				error : null,
			};
			break;

		default:
			return {
				...state,
			};
			break;
	}
};

export default AuthReducer;