import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import PersonContext from './PersonContext';
import PersonReducer from './PersonReducer';

function PersonState(props) {
	const initialState = {
		persons: null,
		person: null,
		current: null,
		filter: null,
		error: [],
	};

	const [state, dispatch] = useReducer(PersonReducer, initialState);

	//Create a new person
	const createPerson = async (person) => {
		try {
			await axios.post('/api/v1/person', person, {
				headers: {
					'content-type': 'multipart/form-data',
				}
			});
			getPersons();
			clearCurrent();
		} catch(err) {
			setError(err);
		}
	};

	//Get all person list
	const getPersons = async () => {
		try {
			const res = await axios('/api/v1/person');
			dispatch({
				type: 'getPersons',
				payload: res.data,
			});
			clearCurrent();
		} catch(err) {
			setError(err);
		}
	}

	//Get a person 
	const getPerson = async id => {
		try {
			const res = await axios(`/api/v1/person/${id}`);
			dispatch({
				type: 'getPerson',
				payload: res.data,
			});
			clearCurrent();
		} catch(err) {
			setError(err);
		}
	}

	//Delete a person 
	const deletePerson = async id => {
		try {
			const res = await axios.delete(`/api/v1/person/${id}`);
			dispatch({
				type: 'deletePerson',
				payload: res.data,
			});
			clearCurrent();
		} catch(err) {
			setError(err);
		}
	}

	//Update a person 
	const updatePerson = async (person, id) => {
		try {
			console.log(person)
			const res = await axios.put(`/api/v1/person/${id}`, person, {
				headers: {
					'content-type': 'application/json',
				}
			});
			console.log(res.data)
			getPersons();
			clearCurrent();
		} catch(err) {
			setError(err);
		}
	}

	//Set a person in current 
	const setCurrent = person => {
		dispatch({
			type: 'setCurrent',
			payload: person,
		})
	}

	//Clear a person from current 
	const clearCurrent = person => {
		dispatch({
			type: 'clearCurrent',
		})
	}

	//Set a person in current 
	const setFilter = text => {
		dispatch({
			type: 'setFilter',
			payload: text,
		});
	};

	//Error handler
	const setError = err => {
		const id = uuidv4();
		dispatch({
			type: 'error',
			payload: {
				id,
				msg: err.response.data.message,
			}
		});
		setTimeout(() => {
			dispatch({
				type: 'removeError',
				payload: id,
			})
		}, 5000)
	}

	return (
		<PersonContext.Provider value={{
			...state,
			createPerson,
			getPersons,
			getPerson,
			deletePerson,
			setCurrent,
			updatePerson,
			setFilter,
		}} >
			{props.children}
		</PersonContext.Provider>
	)
}

export default PersonState