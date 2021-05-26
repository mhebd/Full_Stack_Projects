import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import axios from 'axios';

const ContactState = (props) => {
	const initialState = {
		contacts : [],
		current : null,
		filtered : null,
		error : null,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	//Get Contact  
	const getContact = async () => {
		try {
			const res = await axios.get('/api/v1/contact');
			dispatch({
				type : 'getContact',
				payload : res.data,
			})
		} catch(err) {
			dispatch({
				type : 'contact-error',
				payload : err.response.data.message
			})
		}
	}

	//Add Contact 
	const addContact = async (contact) => {
		try {
			const res = await axios.post('/api/v1/contact', contact, {
				headers: {
					'content-type' : 'application/json',
				}
			});

			dispatch({
				type : 'addContact',
				payload : res.data.contact,
			});
			clearFilter();
		} catch(err) {
			dispatch({
				type : 'contact-error',
				payload : err.response.data.message
			})
		}
	}

	//Update Contact
	const updateContact = async (contact) => {
		try {
			const res = await axios.put(`/api/v1/contact/${contact._id}`, contact, {
				headers : {
					'content-type': 'application/json',
				}
			});
			console.log(res.data.updateContact._id)
			dispatch({
				type : 'updateContact',
				payload : res.data.updateContact,
			});
			clearFilter();
		} catch (err) {
			dispatch({
				type : 'contact-error',
				payload : err.response.data.message,
			})
		}
	}

	//Delete Contact
	const deleteContact = async id => {
		try {
			await axios.delete(`/api/v1/contact/${id}`);
			dispatch({
				type : 'deleteContact',
				payload : id,
			});
			clearFilter();
		} catch (err) {
			dispatch({
				type : 'contact-error',
				payload : err.response.data.message,
			})
		}
	};

	//Set Current contat  
	const setCurrent = contact => {
		dispatch({
			type : 'setCurrent',
			payload : contact,
		})
	};

	//Clear Current Contat  
	const clearCurrent = () => {
		dispatch({
			type : 'clearCurrent',
		})
	}

	//Filter Contact
	const filterContact = text => {
		dispatch({
			type : 'filterContact',
			payload : text,
		})
	}

	//Clear Filter
	const clearFilter = () => {
		dispatch({
			type : 'clearFilter',
		})
	}

	return(
		<ContactContext.Provider value={{
			...state,
			getContact,
			addContact,
			deleteContact,
			setCurrent,
			clearCurrent,
			updateContact,
			filterContact,
			clearFilter,
		}} >
			{props.children}
		</ContactContext.Provider>
	)
};

export default ContactState;