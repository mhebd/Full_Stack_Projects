const ContactReducer = (state, action) => {
	switch (action.type)  {
		case 'getContact':
			return {
				...state,
				...action.payload,
			}

		case 'addContact':
			return {
				...state,
				contacts : [
					action.payload,
					...state.contacts,
				]
			}
			break;

		case 'deleteContact':
			return {
				...state,
				contacts : state.contacts.filter(contact => contact._id !== action.payload),
			}
			break;

		case 'setCurrent':
			return {
				...state,
				current : action.payload,
			}
			break;

		case 'clearCurrent':
			return {
				...state,
				current : null,
			}
			break;

		case 'updateContact': 
			return {
				...state,
				contacts : state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
			};
			break;

		case 'filterContact':
			return {
				...state,
				filtered : state.contacts.filter(contact => {
					const regEx = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regEx) || contact.email.match(regEx) ||  contact.phone.match(regEx);
				})
			}

		case 'clearFilter': 
			return {
				...state,
				filtered : null,
			}

		case 'contact-error':
			return {
				...state,
				error : action.payload,
			}

		default:
			return {
				...state,
			}
			break;
	}
};

export default ContactReducer;