//Alert Reducer 
const AlertReducer = (state, action) => {
	switch (action.type) {
		case 'setAlert':
			return [
				...state,
				action.payload,
			]
			break;

		case 'removeAlert': 
			return state.filter(alert => alert.id !== action.payload);
			break;

		default: 
			return [...state]
			break;
	}
}

export default AlertReducer;