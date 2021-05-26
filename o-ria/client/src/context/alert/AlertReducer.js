
const AlertReducer = (state, action) => {
	switch (action.type) {
		case 'setAlert':
			return [...state, action.payload];
			// eslint-disable-next-line
			break;

		case 'removeAlert':
			return state.filter(alert => action.payload !== alert.id);
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

export default AlertReducer;