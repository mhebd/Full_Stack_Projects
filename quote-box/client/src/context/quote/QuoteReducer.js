//Quote reducer  
const QuoteReducer = (state,  action) => {
	switch (action.type) {
		case 'getQuotes':
			return {
				...state,
				...action.payload,
				current: null,
			}
			break;

		case 'setCurrent':
			return {
				...state,
				current: action.payload,
			}

		case 'error':
			return {
				...state,
				error: [...state.error, action.payload],
				current: null,
			}
			break;

		case 'removeErr':
		case 'removeCurrent':
			return {
				...state,
				error: [],
				current: null,
			}
			break;

		default:
			return {
				...state,
			}
			break;
	}
};

export default QuoteReducer;
