
const PersonReducer = (state, action) => {
	switch (action.type) {
		case 'getPersons':
		case 'getPerson':
			return {
				...state,
				...action.payload,
			};
			// eslint-disable-next-line
			break;

		case 'setCurrent':
			return {
				...state,
				current: {...action.payload}
			};
			// eslint-disable-next-line
			break;

		case 'clearCurrent':
			return {
				...state,
				current: null,
			};
			// eslint-disable-next-line
			break;

		case 'setFilter':
			return {
				...state,
				filter: state.persons.filter(person => {
					const regEx = new RegExp(`${action.payload}`, 'gi');
					return person.name.match(regEx) || person.email.match(regEx) ||  person.phone.match(regEx) || person.type.match(regEx) || person.address.match(regEx) || person.age.match(regEx);
				})
			};
			// eslint-disable-next-line
			break;

		case 'error':
			return {
				...state,
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

export default PersonReducer;