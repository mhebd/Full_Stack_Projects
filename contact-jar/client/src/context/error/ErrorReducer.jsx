const ErrorReducer = (state, action) => {
	switch(action.type) {
		case 'setError':
			return [...state, action.payload]
			break;

		case 'clearError':
			return state.filter(alert => alert.id ==  action.paylaod)
			break;

		default:
			return {
				...state,
			};
			break;
	}
};

export default ErrorReducer;