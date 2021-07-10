import React, { useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import {v4 as uuidv4} from 'uuid';

function AlertState(props) {
	const initialState = [];

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	const setAlert = (alert, type='danger') => {
		const id = uuidv4();
		dispatch({
			type: 'setAlert',
			payload: {
				id, 
				alert, 
				type,
			},
		});

		setTimeout(() => {
			dispatch({
				type: 'removeAlert',
				payload: id,
			})
		}, 5000);
	}

	return (
		<AlertContext.Provider value={{
			alert: state,
			setAlert,
		}} >
			{props.children}
		</AlertContext.Provider>
	)
}

export default AlertState