import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

function AlertState(props) {
	const initialState = [];

	const [state, dispatch] = useReducer(AlertReducer, initialState)

	//Create new error
	const setAlert = (msg, type = 'warning') => {
		const id = uuidv4();
		dispatch({
			type: 'setAlert',
			payload: {
				id,
				msg,
				type,
			}
		});
		setTimeout(() => {
			dispatch({
				type: 'removeAlert',
				payload: id,
			})
		}, 5000)
	}

	return (
		<AlertContext.Provider value={{
			alerts: [...state],
			setAlert,
		}} >
			{props.children}
		</AlertContext.Provider>
	)
}

export default AlertState