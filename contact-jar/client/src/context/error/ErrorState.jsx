import React, { useReducer } from 'react';
import ErrorContext from './ErrorContext.jsx';
import ErrorReducer from './ErrorReducer.jsx';
import { uuid } from 'uuidv4';

const ErrorState = props => {
	const initialState = [];

	const [state, dispatch] = useReducer(ErrorReducer, initialState);

	//Set Error
	const setError = (message, type) => {
		const id = uuid();
		dispatch({
			type : 'setError',
			payload : {
				id,
				message,
				type,
			}
		});

		setTimeout((id) => {
			dispatch({
			type : 'clearError',
			payload : id,
		})
		}, 5000)
	}

	return (
		<ErrorContext.Provider value={{
				alerts : state,
				setError,
			}} >
			{props.children}
		</ErrorContext.Provider>
	)
};

export default ErrorState;